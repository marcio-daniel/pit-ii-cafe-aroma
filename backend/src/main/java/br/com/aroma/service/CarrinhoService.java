package br.com.aroma.service;

import br.com.aroma.dto.CarrinhoDto;
import br.com.aroma.dto.ItemCarrinhoDto;
import br.com.aroma.model.Produto;
import br.com.aroma.repository.ProdutoRepository;
import jakarta.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CarrinhoService {

    private static final String SESSION_KEY = "carrinho";

    private final ProdutoRepository produtoRepository;

    public CarrinhoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public CarrinhoDto obter(HttpSession session) {
        return montarDto(obterSessao(session));
    }

    public CarrinhoDto adicionar(HttpSession session, Long produtoId, int quantidade) {
        if (quantidade <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantidade invalida");
        }

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto nao encontrado"));

        if (!produto.isAtivo()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Produto indisponivel");
        }

        CarrinhoSessao carrinho = obterSessao(session);
        if (produto.getNome().equalsIgnoreCase("Kit Cafe da Manha Casal")) {
            return montarDto(carrinho);
        }
        carrinho.adicionar(produtoId, quantidade);
        return montarDto(carrinho);
    }

    public CarrinhoDto atualizar(HttpSession session, Long produtoId, int quantidade) {
        CarrinhoSessao carrinho = obterSessao(session);
        if (!carrinho.getItens().containsKey(produtoId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item nao esta no carrinho");
        }
        carrinho.atualizar(produtoId, quantidade);
        return montarDto(carrinho);
    }

    public CarrinhoDto remover(HttpSession session, Long produtoId) {
        CarrinhoSessao carrinho = obterSessao(session);
        carrinho.remover(produtoId);
        return montarDto(carrinho);
    }

    public CarrinhoSessao obterSessao(HttpSession session) {
        CarrinhoSessao carrinho = (CarrinhoSessao) session.getAttribute(SESSION_KEY);
        if (carrinho == null) {
            carrinho = new CarrinhoSessao();
            session.setAttribute(SESSION_KEY, carrinho);
        }
        return carrinho;
    }

    public void limpar(HttpSession session) {
        obterSessao(session).limpar();
    }

    private CarrinhoDto montarDto(CarrinhoSessao carrinho) {
        CarrinhoDto dto = new CarrinhoDto();
        List<ItemCarrinhoDto> itens = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (Map.Entry<Long, Integer> entrada : carrinho.getItens().entrySet()) {
            Produto produto = produtoRepository.findById(entrada.getKey())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto nao encontrado"));
            int quantidade = entrada.getValue();
            BigDecimal subtotal = produto.getPreco();
            itens.add(new ItemCarrinhoDto(
                    produto.getId(),
                    produto.getNome(),
                    produto.getPreco(),
                    quantidade,
                    subtotal
            ));
            total = total.add(produto.getPreco());
        }

        dto.setItens(itens);
        dto.setTotal(total);
        return dto;
    }
}
