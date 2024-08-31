import { NextRequest, NextResponse } from 'next/server';

   export async function GET(req: NextRequest) {
     return NextResponse.json({ message: 'Test route working' });
   }

   export async function POST(req: NextRequest) {
     return NextResponse.json({ message: 'POST to test route working' });
   }