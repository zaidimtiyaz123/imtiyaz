import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { appendNewsletterSubscription } from '@/lib/excel';
import { newsletterRateLimiter } from '@/lib/rate-limit';
import { csrfProtection } from '@/lib/csrf';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export async function POST(request: NextRequest) {
  const csrfResponse = await csrfProtection(request);
  if (csrfResponse) {
    return csrfResponse;
  }

  const rateLimitResponse = await newsletterRateLimiter(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = await request.json();
    
    const sanitizedEmail = sanitizeEmail(body.email || '');
    const validatedData = newsletterSchema.parse({ email: sanitizedEmail });

    await appendNewsletterSubscription(validatedData.email);
    
    console.log('New newsletter subscription:', validatedData.email);

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}