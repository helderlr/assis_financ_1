import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const emailNormalizado = email.trim().toLowerCase();
  const { data: user, error } = await supabase
    .from('usuarios')
    .select('id, nome, email')
    .eq('email', emailNormalizado)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }
  return NextResponse.json(user);
} 