package pe.edu.unap.oti.cms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.unap.oti.cms.model.Page;
import java.util.List;
import java.util.Optional;

public interface PageRepository extends JpaRepository<Page, Long> {
    Optional<Page> findBySlug(String slug);
    List<Page> findByCategoryId(Long categoryId);
    List<Page> findByPublishedTrue();
    boolean existsBySlug(String slug);
}