package app.repositories;

import app.model.AnimalType;
import app.model.Colonist;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

public interface AnimalTypeRepository extends CrudRepository<AnimalType, Long> {
    public AnimalType findByAnimalTypeId(Long id);
    public Collection<AnimalType> findAllByAnimalTypeId(Long id);
}
