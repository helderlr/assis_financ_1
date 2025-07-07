import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { token, novaSenha } = await req.json();

  // 1. Buscar token válido
  const { data: tokenData, error: tokenError } = await supabase
    .from('tokens_recuperacao')
    .select('user_id, expires_at')
    .eq('token', token)
    .single();

  if (tokenError || !tokenData) {
    return NextResponse.json({ error: 'Token inválido.' }, { status: 400 });
  }

  if (new Date(tokenData.expires_at) < new Date()) {
    return NextResponse.json({ error: 'Token expirado.' }, { status: 400 });
  }

  // 2. Atualizar senha do usuário (hash)
  const hash = await bcrypt.hash(novaSenha, 10);

  const { error: updateError } = await supabase
    .from('usuarios')
    .update({ senha: hash })
    .eq('id', tokenData.user_id);

  if (updateError) {
    return NextResponse.json({ error: 'Erro ao atualizar senha.' }, { status: 500 });
  }

  // 3. Remover token usado
  await supabase
    .from('tokens_recuperacao')
    .delete()
    .eq('token', token);

  return NextResponse.json({ ok: true });
} 