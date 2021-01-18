package app.repositories;

import app.model.Colonist;
import org.springframework.data.repository.CrudRepository;

public interface ColonistRepository extends CrudRepository<Colonist, Long> {
}
