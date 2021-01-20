package app.repositories;

import app.model.Colonist;
import app.model.ColonyRelation;
import app.model.ColonyRelationId;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ColonyRelationRepository extends CrudRepository<ColonyRelation, ColonyRelationId> {
    Optional<ColonyRelation> findByColonyRelationId(ColonyRelationId id);
}
