package br.com.aroma.service;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

public class CarrinhoSessao implements Serializable {

    private final Map<Long, Integer> itens = new LinkedHashMap<>();

    public Map<Long, Integer> getItens() {
        return itens;
    }

    public void adicionar(Long produtoId, int quantidade) {
        itens.merge(produtoId, quantidade, Integer::sum);
    }

    public void atualizar(Long produtoId, int quantidade) {
        if (quantidade <= 0) {
            itens.remove(produtoId);
        } else {
            itens.put(produtoId, quantidade);
        }
    }

    public void remover(Long produtoId) {
        itens.remove(produtoId);
    }

    public void limpar() {
        itens.clear();
    }

    public boolean estaVazio() {
        return itens.isEmpty();
    }
}
