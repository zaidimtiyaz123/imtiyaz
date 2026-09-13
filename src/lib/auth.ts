import { NextRequest, NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production-min-32-chars'
);

export interface AuthPayload {
  userId: string;
  email: string;
  role: 'admin' | 'client';
  name: string;
}

export async function createToken(payload: AuthPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AuthPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  
  const cookieToken = request.cookies.get('auth_token')?.value;
  if (cookieToken) {
    return cookieToken;
  }
  
  return null;
}

export async function requireAuth(request: NextRequest): Promise<AuthPayload | NextResponse> {
  const token = getTokenFromRequest(request);
  
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Authentication required' },
      { status: 401 }
    );
  }
  
  const payload = await verifyToken(token);
  
  if (!payload) {
    return NextResponse.json(
      { success: false, message: 'Invalid or expired token' },
      { status: 401 }
    );
  }
  
  return payload;
}

export async function requireAdmin(request: NextRequest): Promise<AuthPayload | NextResponse> {
  const authResult = await requireAuth(request);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  
  if (authResult.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Admin access required' },
      { status: 403 }
    );
  }
  
  return authResult;
}

export function setAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}