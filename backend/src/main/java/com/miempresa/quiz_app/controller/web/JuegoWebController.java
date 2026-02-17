package com.miempresa.quiz_app.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class JuegoWebController {

    // Redirige a React con las opciones seleccionadas
    @PostMapping("/jugar")
    public String irALoginReact(
            @RequestParam(required = false) List<String> categorias,
            @RequestParam(required = false) List<String> tipos,
            @RequestParam(defaultValue = "10") int cantidad) {

        // Convertimos las listas a String para pasarlas por URL
        String cats = (categorias != null) ? String.join(",", categorias) : "";
        String typs = (tipos != null) ? String.join(",", tipos) : "";

        // Redirigimos a la ruta de login de React con los parámetros de configuración
        return "redirect:http://localhost:5173/login?categorias=" + cats + 
               "&tipos=" + typs + "&cantidad=" + cantidad;
    }
}