package app.repositories;

import app.model.Resource;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ResourceRepository extends CrudRepository<Resource, Long> {
    public Resource findByResourceId(Long id);
    public Optional<Resource> findByName(String name);
}
