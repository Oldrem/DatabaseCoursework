package app.repositories;

import app.model.Relationship;
import app.model.RelationshipId;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.Optional;

public interface RelationshipRepository extends CrudRepository<Relationship, RelationshipId> {
    Optional<Relationship> findByRelationshipId(RelationshipId id);
    Collection<Relationship> findAllByRelationshipId_Colonist1Id(Long id);
}
