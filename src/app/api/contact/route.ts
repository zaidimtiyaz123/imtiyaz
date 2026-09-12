import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createContactInquiry } from '@/lib/db';
import { appendContactInquiry } from '@/lib/excel';
import { sendContactInquiryEmail } from '@/lib/email';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  company: z.string().optional(),
  service: z.string().min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  message: z.string().min(20),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = contactSchema.parse(body);

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

    return NextResponse.json(
      { success: true, message: 'Inquiry submitted successfully', data: inquiry },
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