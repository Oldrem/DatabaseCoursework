package app.repositories;

import app.model.AnimalType;
import app.model.Colonist;
import org.springframework.data.repository.CrudRepository;

public interface AnimalTypeRepository extends CrudRepository<AnimalType, Long> {
}
