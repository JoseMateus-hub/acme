import { NextResponse } from 'next/server';
import { CustomerController } from '@/controllers/CustomerController';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = await CustomerController.getAll(searchParams);
  return NextResponse.json(result.body, { status: result.status });
}

export async function POST(request: Request) {
  const data = await request.json();
  const result = await CustomerController.create(data);
  return NextResponse.json(result.body, { status: result.status });
}