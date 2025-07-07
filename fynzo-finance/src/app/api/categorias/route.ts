import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET: Listar categorias do usuário
export async function GET(req: NextRequest) {
  const usuario_id = req.nextUrl.searchParams.get('usuario_id');
  if (!usuario_id) return NextResponse.json({ error: 'Usuário não informado.' }, { status: 400 });

  const { data, error } = await supabase
    .from('categoria_transacao')
    .select('*')
    .eq('usuario_id', usuario_id)
    .order('descricao');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Criar categoria
export async function POST(req: NextRequest) {
  const { descricao, usuario_id } = await req.json();
  if (!descricao || !usuario_id) return NextResponse.json({ error: 'Dados obrigatórios faltando.' }, { status: 400 });

  const { data, error } = await supabase
    .from('categoria_transacao')
    .insert([{ descricao, usuario_id }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PUT: Editar categoria
export async function PUT(req: NextRequest) {
  const { id, descricao, usuario_id } = await req.json();
  if (!id || !descricao || !usuario_id) return NextResponse.json({ error: 'Dados obrigatórios faltando.' }, { status: 400 });

  const { data, error } = await supabase
    .from('categoria_transacao')
    .update({ descricao })
    .eq('id', id)
    .eq('usuario_id', usuario_id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE: Excluir categoria
export async function DELETE(req: NextRequest) {
  const { id, usuario_id } = await req.json();
  if (!id || !usuario_id) return NextResponse.json({ error: 'Dados obrigatórios faltando.' }, { status: 400 });

  const { error } = await supabase
    .from('categoria_transacao')
    .delete()
    .eq('id', id)
    .eq('usuario_id', usuario_id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
} 