package pe.edu.unap.oti.cms.repository;

import pe.edu.unap.oti.cms.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}