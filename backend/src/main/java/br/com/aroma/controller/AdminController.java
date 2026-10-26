package br.com.aroma.controller;

import br.com.aroma.dto.PedidoResponse;
import br.com.aroma.service.PedidoService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final PedidoService pedidoService;

    public AdminController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping("/pedidos")
    public List<PedidoResponse> listarPedidos() {
        return pedidoService.listarTodos();
    }
}
