import { NextResponse } from 'next/server';
import { CustomerController } from '@/controllers/CustomerController';

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const result = await CustomerController.getById(params.id);
  return NextResponse.json(result.body, { status: result.status });
}

export async function PUT(request: Request, { params }: Params) {
  const data = await request.json();
  const result = await CustomerController.update(params.id, data);
  return NextResponse.json(result.body, { status: result.status });
}

export async function DELETE(_req: Request, { params }: Params) {
  const result = await CustomerController.remove(params.id);
  return NextResponse.json(result.body, { status: result.status });
}