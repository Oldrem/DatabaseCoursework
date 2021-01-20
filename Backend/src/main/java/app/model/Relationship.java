package app.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class Relationship {
    @EmbeddedId private RelationshipId relationshipId;
    private Integer level;
    private String type;

    public Relationship() {}

    public Relationship(long colonist1Id, long colonist2Id, Integer level, String type) {
        this.level = level;
        this.type = type;
    }

    public RelationshipId getRelationshipId() {
        return relationshipId;
    }

    public void setRelationshipId(RelationshipId relationshipId) {
        this.relationshipId = relationshipId;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
