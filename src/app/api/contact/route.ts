import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createContactInquiry } from '@/lib/db';
import { appendContactInquiry } from '@/lib/excel';
import { sendContactInquiryEmail } from '@/lib/email';
import { sendContactInquiryWhatsApp } from '@/lib/whatsapp';
import { contactRateLimiter } from '@/lib/rate-limit';
import { csrfProtection } from '@/lib/csrf';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  company: z.string().max(100).optional(),
  service: z.string().min(1).max(50),
  budget: z.string().min(1).max(50),
  timeline: z.string().min(1).max(50),
  message: z.string().min(20).max(5000),
});

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export async function POST(request: NextRequest) {
  const csrfResponse = await csrfProtection(request);
  if (csrfResponse) {
    return csrfResponse;
  }

  const rateLimitResponse = await contactRateLimiter(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = await request.json();
    
    const sanitizedBody = {
      name: sanitizeInput(body.name || ''),
      email: sanitizeInput(body.email || '').toLowerCase(),
      phone: sanitizeInput(body.phone || ''),
      company: body.company ? sanitizeInput(body.company) : undefined,
      service: sanitizeInput(body.service || ''),
      budget: sanitizeInput(body.budget || ''),
      timeline: sanitizeInput(body.timeline || ''),
      message: sanitizeInput(body.message || ''),
    };

    const validatedData = contactSchema.parse(sanitizedBody);

    const inquiry = createContactInquiry({
      ...validatedData,
      company: validatedData.company || null,
    });
    
    await appendContactInquiry({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company || '',
      service: validatedData.service,
      budget: validatedData.budget,
      timeline: validatedData.timeline,
      message: validatedData.message,
    });
    
    console.log('New contact inquiry saved to database and Excel:', inquiry);

    await sendContactInquiryEmail({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company || undefined,
      service: validatedData.service,
      budget: validatedData.budget,
      timeline: validatedData.timeline,
      message: validatedData.message,
    });

    const whatsappSent = await sendContactInquiryWhatsApp({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company || undefined,
      service: validatedData.service,
      budget: validatedData.budget,
      timeline: validatedData.timeline,
      message: validatedData.message,
    });

    return NextResponse.json(
      { success: true, message: 'Inquiry submitted successfully', data: inquiry, whatsappSent },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}