package br.com.aroma.config;

import br.com.aroma.model.Produto;
import br.com.aroma.repository.ProdutoRepository;
import java.math.BigDecimal;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DadosIniciais implements CommandLineRunner {

    private final ProdutoRepository produtoRepository;

    public DadosIniciais(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @Override
    public void run(String... args) {
        if (produtoRepository.count() > 0) {
            return;
        }

        produtoRepository.save(criar(
                "Cafe Bourbon Amarelo 250g",
                "Graos especiais torrados artesanalmente, notas de caramelo e chocolate.",
                "42.90",
                "Cafe"
        ));
        produtoRepository.save(criar(
                "Cafe Catuai Vermelho 250g",
                "Torra media, acidez equilibrada e aroma floral.",
                "39.90",
                "Cafe"
        ));
        produtoRepository.save(criar(
                "Kit Cafe da Manha Casal",
                "Dois cafes especiais, pao de queijo e geleia artesanal para duas pessoas.",
                "89.90",
                "Kit"
        ));
        produtoRepository.save(criar(
                "Kit Experiencia Gourmet",
                "Selecao de tres cafes premium com guia de preparo.",
                "129.90",
                "Kit"
        ));
        produtoRepository.save(criar(
                "Caneca Aroma da Serra",
                "Caneca ceramica 300ml com a marca da cafeteria.",
                "34.90",
                "Acessorio"
        ));
        produtoRepository.save(criar(
                "Filtro de papel (pacote)",
                "Pacote com 100 filtros tamanho 103.",
                "18.50",
                "Acessorio"
        ));
    }

    private Produto criar(String nome, String descricao, String preco, String categoria) {
        Produto produto = new Produto();
        produto.setNome(nome);
        produto.setDescricao(descricao);
        produto.setPreco(new BigDecimal(preco));
        produto.setCategoria(categoria);
        produto.setAtivo(true);
        return produto;
    }
}
