package br.com.aroma.controller;

import br.com.aroma.dto.AdicionarCarrinhoRequest;
import br.com.aroma.dto.AtualizarCarrinhoRequest;
import br.com.aroma.dto.CarrinhoDto;
import br.com.aroma.service.CarrinhoService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/carrinho")
public class CarrinhoController {

    private final CarrinhoService carrinhoService;

    public CarrinhoController(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    @GetMapping
    public CarrinhoDto obter(HttpSession session) {
        return carrinhoService.obter(session);
    }

    @PostMapping("/itens")
    public CarrinhoDto adicionar(@RequestBody AdicionarCarrinhoRequest request, HttpSession session) {
        return carrinhoService.adicionar(session, request.getProdutoId(), request.getQuantidade());
    }

    @PutMapping("/itens/{produtoId}")
    public CarrinhoDto atualizar(
            @PathVariable Long produtoId,
            @RequestBody AtualizarCarrinhoRequest request,
            HttpSession session
    ) {
        return carrinhoService.atualizar(session, produtoId, request.getQuantidade());
    }

    @DeleteMapping("/itens/{produtoId}")
    public CarrinhoDto remover(@PathVariable Long produtoId, HttpSession session) {
        return carrinhoService.remover(session, produtoId);
    }
}
