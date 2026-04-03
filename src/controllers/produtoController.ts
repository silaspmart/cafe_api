import type { Request, Response } from "express"
import { ProdutoModel } from "../models/Produto.js"

export const getProdutos = async (req: Request, res: Response) => {
    try {
        const produtos = await ProdutoModel.listarTodos();
        res.json(produtos);
    } catch(error) {
        res.status(500).json({error: `Erro ao buscar: ${error}`})
    }
}

export const criarProduto = async (req: Request, res: Response) => {
    if(!req.body.nome || !req.body.preco || !req.body.estoque) {
        return res.status(400).json({error: "Nome, preço e estoque são obrigatórios!"})
    }

    try {
        const novoProduto = await ProdutoModel.criar(req.body);
        return res.status(201).json(novoProduto);
    } catch(error){
        res.status(500).json({ error: `Erro ao cadastrar: ${error}`});
    }
}

export const getProdutoPorId = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const produto = await ProdutoModel.buscarPorID(id);
        return res.json(produto)
    } catch {
        res.status(500).json({error: "Erro ao buscar o produto"})
    }
}

export const deletarProduto = async (req:Request, res:Response) => {
    const id = Number(req.params.id)
    console.log(id)
    try {
        const deletado = await ProdutoModel.delete(id);
        if(!deletado) {
            return res.status(404).json({error: "Produto não encontrado"})
        } res.status(204).send()
    } catch(error) {
        res.status(500).json({error: `Erro ao deletar: ${error}`})
    }
}

export const atualizarProduto = async (req:Request, res: Response) => {
    const id = Number(req.params.id)
    console.log(id)
    try{
        const produtoAtual = await ProdutoModel.buscarPorID(id);
            if(!produtoAtual) {
                return res.status(404).json({error: "Produto não encontrado"})
        } 
        const dados = {
            nome: req.body.nome ?? produtoAtual.nome,
            preco: req.body.preco ?? produtoAtual.preco,
            estoque: req.body.estoque ?? produtoAtual.estoque,
        }
        const atualizado = await ProdutoModel.atualizar(id,dados);
        return res.json(atualizado);
    } catch (error) {
        return res.status(500).json({
            error: `Erro ao atualizar: ${error}`
        });
    }
}