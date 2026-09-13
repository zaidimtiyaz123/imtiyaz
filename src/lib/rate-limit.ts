import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyPrefix?: string;
}

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitInfo>();

function cleanupStore(): void {
  const now = Date.now();
  rateLimitStore.forEach((info, key) => {
    if (info.resetTime < now) {
      rateLimitStore.delete(key);
    }
  });
}

setInterval(cleanupStore, 60000);

export function createRateLimiter(config: RateLimitConfig) {
  const { windowMs, maxRequests, keyPrefix = 'rl' } = config;

  return async function rateLimit(
    request: NextRequest,
    key?: string
  ): Promise<NextResponse | null> {
    const identifier = key || request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = `${keyPrefix}:${identifier}`;
    
    const now = Date.now();
    const windowStart = now - windowMs;
    
    let info = rateLimitStore.get(rateLimitKey);
    
    if (!info || info.resetTime < now) {
      info = {
        count: 0,
        resetTime: now + windowMs,
      };
    }
    
    info.count++;
    rateLimitStore.set(rateLimitKey, info);
    
    const remaining = Math.max(0, maxRequests - info.count);
    const resetTime = new Date(info.resetTime).toISOString();
    
    const headers = {
      'X-RateLimit-Limit': maxRequests.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': resetTime,
    };
    
    if (info.count > maxRequests) {
      const retryAfter = Math.ceil((info.resetTime - now) / 1000);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.',
          retryAfter 
        },
        { 
          status: 429,
          headers: {
            ...headers,
            'Retry-After': retryAfter.toString(),
          }
        }
      );
    }
    
    return null;
  };
}

export const contactRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 requests per 15 minutes
  keyPrefix: 'contact',
});

export const newsletterRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10, // 10 requests per hour
  keyPrefix: 'newsletter',
});

export const apiRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute
  keyPrefix: 'api',
});