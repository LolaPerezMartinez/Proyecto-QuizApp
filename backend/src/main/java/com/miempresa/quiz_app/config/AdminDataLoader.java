package com.miempresa.quiz_app.config;

import com.miempresa.quiz_app.model.mysql.entity.Usuario;
import com.miempresa.quiz_app.repository.mysql.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminDataLoader implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // Inyección por constructor para asegurar que los beans estén listos
    public AdminDataLoader(UsuarioRepository usuarioRepository, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Solo actuamos si la base de datos de usuarios está vacía
        if (usuarioRepository.count() == 0) {
            Usuario admin = new Usuario();
            admin.setNombre("admin");
            
            // Encriptamos la contraseña "admin1234"
            admin.setPassword(passwordEncoder.encode("admin1234"));
            
            // Asignamos el Enum ADMIN (en la DB se guardará como "ADMIN")
            admin.setRol(Usuario.Rol.ADMIN);

            usuarioRepository.save(admin);

            System.out.println("****************************************************");
            System.out.println("🚀 INITIAL DATA LOAD: Usuario administrador creado");
            System.out.println("👤 Username: admin");
            System.out.println("🔑 Password: admin1234");
            System.out.println("🛡️  Rol: ADMIN (Se enviará como ROLE_ADMIN en el token)");
            System.out.println("****************************************************");
        } else {
            System.out.println("ℹ️  AdminDataLoader: La base de datos ya tiene usuarios, no se crea el admin.");
        }
    }
}