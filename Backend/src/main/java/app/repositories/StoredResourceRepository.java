package app.repositories;

import app.model.StoredResource;
import app.model.StoredResourceId;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface StoredResourceRepository extends CrudRepository<StoredResource, StoredResourceId> {
    Optional<StoredResource> findByStoredResourceId(StoredResourceId id);
}
