import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function gerarToken(length = 48) {
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const emailNormalizado = email.trim().toLowerCase();

  // 1. Buscar usuário
  const { data: user, error: userError } = await supabase
    .from('usuarios')
    .select('id, nome')
    .eq('email', emailNormalizado)
    .single();

  if (userError || !user) {
    return NextResponse.json({ error: 'E-mail não encontrado.' }, { status: 404 });
  }

  // 2. Gerar token e salvar
  const token = gerarToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60).toISOString(); // 1h

  const { error: tokenError } = await supabase
    .from('tokens_recuperacao')
    .insert([{ user_id: user.id, token, expires_at: expiresAt }]);

  if (tokenError) {
    return NextResponse.json({ error: 'Erro ao gerar token.' }, { status: 500 });
  }

  // 3. Montar link
  const link = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/resetar-senha?token=${token}`;

  // 4. Enviar e-mail
  const msg = {
    to: email,
    from: 'fynzo@fynzo.com.br',
    subject: 'Recuperação de senha - Fynzo',
    html: `
      <p>Olá, ${user.nome || 'usuário'}!</p>
      <p>Recebemos uma solicitação para redefinir sua senha no Fynzo.</p>
      <p><a href="${link}" style="background:#22c55e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Clique aqui para redefinir sua senha</a></p>
      <p>Ou copie e cole este link no navegador:<br>${link}</p>
      <p>Se não foi você, ignore este e-mail.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Erro ao enviar e-mail:', err);
    return NextResponse.json({ error: 'Erro ao enviar e-mail de recuperação.', details: err }, { status: 500 });
  }
} 