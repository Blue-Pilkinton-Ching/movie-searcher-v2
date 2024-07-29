// middleware.js
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = new URL(request.url)
  const urlWithoutSearchParams = `${url.origin}${url.pathname}`

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url-without-params', urlWithoutSearchParams)

  console.log(urlWithoutSearchParams)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: '/browse/:path*',
}
