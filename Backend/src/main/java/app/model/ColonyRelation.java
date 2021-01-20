package app.model;

import javax.persistence.*;

@Entity
@Table(name = "colony_relation")
public class ColonyRelation {
    @EmbeddedId private ColonyRelationId colonyRelationId;
    private Integer level;

    private ColonyRelation() {}

    public ColonyRelation(Integer level) {
        this.level = level;
    }

    public ColonyRelationId getColonyRelationId() {
        return colonyRelationId;
    }

    public void setColonyRelationId(ColonyRelationId colonyRelationId) {
        this.colonyRelationId = colonyRelationId;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }
}
