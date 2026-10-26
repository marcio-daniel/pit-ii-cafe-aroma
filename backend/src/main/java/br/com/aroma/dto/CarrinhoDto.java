package br.com.aroma.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CarrinhoDto {

    private List<ItemCarrinhoDto> itens = new ArrayList<>();
    private BigDecimal total = BigDecimal.ZERO;

    public List<ItemCarrinhoDto> getItens() {
        return itens;
    }

    public void setItens(List<ItemCarrinhoDto> itens) {
        this.itens = itens;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }
}
