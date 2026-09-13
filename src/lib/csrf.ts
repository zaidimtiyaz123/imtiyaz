import { NextRequest, NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

const CSRF_SECRET = new TextEncoder().encode(
  process.env.CSRF_SECRET || 'your-csrf-secret-key-change-in-production-min-32-chars-long'
);

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

export async function generateCsrfToken(): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(CSRF_SECRET);
}

export async function verifyCsrfToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, CSRF_SECRET);
    return true;
  } catch {
    return false;
  }
}

export function getCsrfTokenFromRequest(request: NextRequest): string | null {
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  if (headerToken) {
    return headerToken;
  }

  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

export async function csrfProtection(request: NextRequest): Promise<NextResponse | null> {
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return null;
  }

  const token = getCsrfTokenFromRequest(request);
  
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'CSRF token required' },
      { status: 403 }
    );
  }

  const isValid = await verifyCsrfToken(token);
  
  if (!isValid) {
    return NextResponse.json(
      { success: false, message: 'Invalid CSRF token' },
      { status: 403 }
    );
  }

  return null;
}

export function setCsrfCookie(response: NextResponse, token: string): void {
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
    path: '/',
  });
}

export async function getCsrfToken(): Promise<string> {
  return generateCsrfToken();
}