import { NextResponse, NextRequest, type MiddlewareConfig } from "next/server";

const publicRoutes = [
  {
    path: "/sign-in",
    whenAuthenticated: "redirect",
  },
  {
    path: "/sign-up",
    whenAuthenticated: "redirect",
  },
  {
    path: "/monitor/sign-in",
    whenAuthenticated: "redirect",
  },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";

function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) return true;

    const payload = parts[1];

    const base64 = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(payload.length + ((4 - (payload.length % 4)) % 4), "=");

    const decoded = JSON.parse(atob(base64));

    if (!decoded.exp) return true;

    const now = Math.floor(Date.now() / 1000);

    return decoded.exp < now;
  } catch {
    return true;
  }
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authAccessToken = request.cookies.get("access_token");

  if (!authAccessToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authAccessToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (
    authAccessToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/my-rooms";

    return NextResponse.redirect(redirectUrl);
  }

  if (authAccessToken && !publicRoute) {
    if (isTokenExpired(authAccessToken.value)) {
      const redirectUrl = request.nextUrl.clone();

      redirectUrl.pathname = "/sign-in";
      const response = NextResponse.redirect(redirectUrl);
      response.cookies.delete("access_token");
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
