import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(_request: NextRequest) {
  const response = NextResponse.next()

  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type")

  return response
}

export const config = {
  matcher: "/api/:path*",
}
