import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    return NextResponse.json({ 
      status: 'Connected to MySQL!', 
      data: rows 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'Connection failed', 
      message: error.message 
    }, { status: 500 });
  }
}