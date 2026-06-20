import { NextResponse, type NextRequest } from "next/server";

function unauthorized(message = "Authentication required") {
  return new NextResponse(message, {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Innersolv Admin"',
    },
  });
}

export function proxy(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return new NextResponse("Admin authentication is not configured.", {
      status: 503,
    });
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return unauthorized();
  }

  let credentials = "";

  try {
    credentials = atob(authorization.slice("Basic ".length));
  } catch {
    return unauthorized("Invalid authentication header");
  }

  const separator = credentials.indexOf(":");
  const suppliedUsername = credentials.slice(0, separator);
  const suppliedPassword = credentials.slice(separator + 1);

  if (suppliedUsername !== username || suppliedPassword !== password) {
    return unauthorized("Invalid username or password");
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
