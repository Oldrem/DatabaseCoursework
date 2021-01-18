package app.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ColonyRelation {
    @EmbeddedId private ColonyRelationId colonyRelationId;
    private int level;

    private ColonyRelation() {}

    public ColonyRelation(int level) {
        this.level = level;
    }

    public ColonyRelationId getColonyRelationId() {
        return colonyRelationId;
    }

    public void setColonyRelationId(ColonyRelationId colonyRelationId) {
        this.colonyRelationId = colonyRelationId;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }
}
