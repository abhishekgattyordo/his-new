import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, userCount: data.users.length });
  } catch (err) {
    return NextResponse.json({ error: 'Network error', details: String(err) }, { status: 500 });
  }
}