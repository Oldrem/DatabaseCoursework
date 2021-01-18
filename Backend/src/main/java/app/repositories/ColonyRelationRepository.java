package app.repositories;

import app.model.Colonist;
import app.model.ColonyRelation;
import app.model.ColonyRelationId;
import org.springframework.data.repository.CrudRepository;

public interface ColonyRelationRepository extends CrudRepository<ColonyRelation, ColonyRelationId> {
}
