package br.com.aroma.service;

import br.com.aroma.dto.CriarPedidoRequest;
import br.com.aroma.dto.ItemCarrinhoDto;
import br.com.aroma.dto.PedidoResponse;
import br.com.aroma.model.Cliente;
import br.com.aroma.model.ItemPedido;
import br.com.aroma.model.Pedido;
import br.com.aroma.model.Produto;
import br.com.aroma.model.StatusPedido;
import br.com.aroma.repository.ClienteRepository;
import br.com.aroma.repository.PedidoRepository;
import br.com.aroma.repository.ProdutoRepository;
import jakarta.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;
    private final CarrinhoService carrinhoService;

    public PedidoService(
            PedidoRepository pedidoRepository,
            ClienteRepository clienteRepository,
            ProdutoRepository produtoRepository,
            CarrinhoService carrinhoService
    ) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.produtoRepository = produtoRepository;
        this.carrinhoService = carrinhoService;
    }

    @Transactional
    public PedidoResponse criar(CriarPedidoRequest request, HttpSession session) {
        validarRequest(request);

        CarrinhoSessao carrinho = carrinhoService.obterSessao(session);
        if (carrinho.estaVazio()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Carrinho vazio");
        }

        Cliente cliente = clienteRepository.findByEmailIgnoreCase(request.getEmail().trim())
                .orElseGet(Cliente::new);
        cliente.setNome(request.getNome().trim());
        cliente.setEmail(request.getEmail().trim().toLowerCase());
        cliente.setTelefone(request.getTelefone() == null ? null : request.getTelefone().trim());
        cliente = clienteRepository.save(cliente);

        Pedido pedido = new Pedido();
        pedido.setDataCriacao(LocalDateTime.now());
        pedido.setCliente(cliente);
        pedido.setEndereco(request.getEndereco().trim());
        pedido.setCidade(request.getCidade().trim());
        pedido.setCep(request.getCep().trim());
        pedido.setFormaPagamento(request.getFormaPagamento().trim());

        String forma = request.getFormaPagamento().trim().toLowerCase();
        if (forma.contains("pix") || forma.contains("cartao") || forma.contains("cartão")) {
            pedido.setStatus(StatusPedido.PAGO);
        } else {
            pedido.setStatus(StatusPedido.PENDENTE);
        }

        BigDecimal total = BigDecimal.ZERO;
        for (Map.Entry<Long, Integer> entrada : carrinho.getItens().entrySet()) {
            Produto produto = produtoRepository.findById(entrada.getKey())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto nao encontrado"));
            int quantidade = entrada.getValue();
            ItemPedido item = new ItemPedido();
            item.setProduto(produto);
            item.setQuantidade(quantidade);
            item.setPrecoUnitario(produto.getPreco());
            pedido.adicionarItem(item);
            total = total.add(produto.getPreco().multiply(BigDecimal.valueOf(quantidade)));
        }

        pedido.setTotal(total);
        Pedido salvo = pedidoRepository.save(pedido);
        carrinhoService.limpar(session);
        return paraResponse(salvo);
    }

    public PedidoResponse buscarPorId(Long id) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido nao encontrado"));
        return paraResponse(pedido);
    }

    public List<PedidoResponse> listarTodos() {
        List<PedidoResponse> lista = new ArrayList<>();
        for (Pedido pedido : pedidoRepository.findAllByOrderByDataCriacaoDesc()) {
            lista.add(paraResponse(pedido));
        }
        return lista;
    }

    private void validarRequest(CriarPedidoRequest request) {
        if (request.getNome() == null || request.getNome().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome obrigatorio");
        }
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email obrigatorio");
        }
        if (request.getEndereco() == null || request.getEndereco().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Endereco obrigatorio");
        }
        if (request.getCidade() == null || request.getCidade().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cidade obrigatoria");
        }
        if (request.getCep() == null || request.getCep().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CEP obrigatorio");
        }
        if (request.getFormaPagamento() == null || request.getFormaPagamento().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Forma de pagamento obrigatoria");
        }
    }

    private PedidoResponse paraResponse(Pedido pedido) {
        PedidoResponse response = new PedidoResponse();
        response.setId(pedido.getId());
        response.setDataCriacao(pedido.getDataCriacao());
        response.setStatus(pedido.getStatus());
        response.setTotal(pedido.getTotal());
        response.setFormaPagamento(pedido.getFormaPagamento());
        response.setEndereco(pedido.getEndereco());
        response.setCidade(pedido.getCidade());
        response.setCep(pedido.getCep());
        response.setClienteNome(pedido.getCliente().getNome());
        response.setClienteEmail(pedido.getCliente().getEmail());

        List<ItemCarrinhoDto> itens = new ArrayList<>();
        for (ItemPedido item : pedido.getItens()) {
            BigDecimal subtotal = item.getPrecoUnitario().multiply(BigDecimal.valueOf(item.getQuantidade()));
            itens.add(new ItemCarrinhoDto(
                    item.getProduto().getId(),
                    item.getProduto().getNome(),
                    item.getPrecoUnitario(),
                    item.getQuantidade(),
                    subtotal
            ));
        }
        response.setItens(itens);
        return response;
    }
}
