export interface Categoria {
  id: number;
  descricao: string;
  usuario_id: number;
  created_at: string;
}

const API_URL = '/api/categorias';

export async function listarCategorias(usuario_id: number): Promise<Categoria[]> {
  const res = await fetch(`${API_URL}?usuario_id=${usuario_id}`);
  if (!res.ok) throw new Error('Erro ao buscar categorias');
  return res.json();
}

export async function criarCategoria(descricao: string, usuario_id: number): Promise<Categoria> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descricao, usuario_id }),
  });
  if (!res.ok) throw new Error('Erro ao criar categoria');
  return res.json();
}

export async function editarCategoria(id: number, descricao: string, usuario_id: number): Promise<Categoria> {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, descricao, usuario_id }),
  });
  if (!res.ok) throw new Error('Erro ao editar categoria');
  return res.json();
}

export async function excluirCategoria(id: number, usuario_id: number): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, usuario_id }),
  });
  if (!res.ok) throw new Error('Erro ao excluir categoria');
} 