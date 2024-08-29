import { NextResponse } from 'next/server';

export function throwErr(imageName: string): NextResponse {
  return new NextResponse(
    `<html>
      <body>
        <h1>Error</h1>
        <img src="/images/${imageName}" alt="Error Image" />
        <p>An error occurred. Please try again later.</p>
      </body>
    </html>`,
    {
      status: 500,
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}
