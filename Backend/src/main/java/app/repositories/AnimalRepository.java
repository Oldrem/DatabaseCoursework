package app.repositories;

import app.model.Animal;
import app.model.Colonist;
import org.springframework.data.repository.CrudRepository;

public interface AnimalRepository extends CrudRepository<Animal, Long> {
}
