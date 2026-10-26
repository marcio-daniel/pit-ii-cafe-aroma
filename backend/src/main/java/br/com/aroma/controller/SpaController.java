package br.com.aroma.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping(value = {
            "/",
            "/produto/{id:[0-9]+}",
            "/carrinho",
            "/checkout",
            "/pedido/{id:[0-9]+}",
            "/admin"
    })
    public String spa() {
        return "forward:/index.html";
    }
}
