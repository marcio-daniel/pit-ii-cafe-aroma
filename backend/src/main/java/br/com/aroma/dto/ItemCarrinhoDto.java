package br.com.aroma.dto;

import java.math.BigDecimal;

public class ItemCarrinhoDto {

    private Long produtoId;
    private String nome;
    private BigDecimal precoUnitario;
    private int quantidade;
    private BigDecimal subtotal;

    public ItemCarrinhoDto() {
    }

    public ItemCarrinhoDto(Long produtoId, String nome, BigDecimal precoUnitario, int quantidade, BigDecimal subtotal) {
        this.produtoId = produtoId;
        this.nome = nome;
        this.precoUnitario = precoUnitario;
        this.quantidade = quantidade;
        this.subtotal = subtotal;
    }

    public Long getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(Long produtoId) {
        this.produtoId = produtoId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(BigDecimal precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }
}
