'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  Categoria,
  listarCategorias,
  criarCategoria,
  editarCategoria,
  excluirCategoria,
} from '../services/categoriasService';

export function useCategorias(usuario_id: number) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const fetchCategorias = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const data = await listarCategorias(usuario_id);
      setCategorias(data);
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }, [usuario_id]);

  useEffect(() => {
    console.log('usuario_id:', usuario_id);
    fetchCategorias();
  }, [fetchCategorias]);

  useEffect(() => {
    console.log('categorias:', categorias);
  }, [categorias]);

  const adicionar = async (descricao: string) => {
    setLoading(true);
    setErro(null);
    try {
      const nova = await criarCategoria(descricao, usuario_id);
      setCategorias((prev) => [...prev, nova]);
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  };

  const editar = async (id: number, descricao: string) => {
    setLoading(true);
    setErro(null);
    try {
      const atualizada = await editarCategoria(id, descricao, usuario_id);
      setCategorias((prev) =>
        prev.map((cat) => (cat.id === id ? atualizada : cat))
      );
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  };

  const remover = async (id: number) => {
    setLoading(true);
    setErro(null);
    try {
      await excluirCategoria(id, usuario_id);
      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
    } catch (e: any) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    categorias,
    loading,
    erro,
    fetchCategorias,
    adicionar,
    editar,
    remover,
  };
} 