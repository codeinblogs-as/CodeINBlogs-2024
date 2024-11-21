import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const userRole = req.cookies.get('userRole')?.value;
console.log("user role",userRole);
  if (userRole === '1') {
    return NextResponse.next(); // Allow access to the route
  }

  // Redirect non-admin users to the unauthorized page
  return NextResponse.redirect(new URL('/', req.url));
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/admindashboard'], // Protect admin routes
};
