package app.repositories;

import app.model.Occupation;
import org.springframework.data.repository.CrudRepository;

public interface OccupationRepository extends CrudRepository<Occupation, Long> {
    Occupation findByName(String name);
    Occupation findByOccupationId(Long id);
}
