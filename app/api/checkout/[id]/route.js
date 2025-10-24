import { checkout } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    const id = Number(params.id);
    if (!id || Number.isNaN(id)) {
      return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });
    }

    // lazy-load the DB client to avoid creating connections at module import time
    const { db } = await import('@/config/db');
    const result = await db.delete(checkout).where(eq(checkout.id, id));

    // `result` shape may vary by adapter; assume success if no exception thrown
    return NextResponse.json({ success: true, message: 'Booking deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
