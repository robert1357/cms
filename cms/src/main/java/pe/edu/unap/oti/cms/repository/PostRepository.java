package pe.edu.unap.oti.cms.repository;

import pe.edu.unap.oti.cms.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    // Métodos personalizados aquí si se requieren
}