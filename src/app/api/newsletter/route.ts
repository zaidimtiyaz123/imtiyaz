import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { appendNewsletterSubscription } from '@/lib/excel';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = newsletterSchema.parse(body);

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