package com.miempresa.quiz_app.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Datos de una canción")
public record MusicaDTO(

    @Schema(description = "Identificador único de la canción", example = "1")
    String id,

    @Schema(description = "Título de la canción", example = "Bohemian Rhapsody")
    String titulo,

    @Schema(description = "Nombre del artista o banda", example = "Queen")
    String artista,

    @Schema(description = "URL del archivo de audio", example = "https://ejemplo.com/audio/bohemian.mp3")
    String urlAudio,

    @Schema(description = "URL de la imagen o portada", example = "https://ejemplo.com/imagenes/queen.jpg")
    String urlImagen

) {}