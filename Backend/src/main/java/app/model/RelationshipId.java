package app.model;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class RelationshipId implements Serializable {
    private long colonist1Id;
    private long colonist2Id;

    private RelationshipId() {}

    public RelationshipId(long colonist1Id, long colonist2Id) {
        this.colonist1Id = colonist1Id;
        this.colonist2Id = colonist2Id;
    }

    public long getColonist1Id() {
        return colonist1Id;
    }

    public void setColonist1Id(long colonist1Id) {
        this.colonist1Id = colonist1Id;
    }

    public long getColonist2Id() {
        return colonist2Id;
    }

    public void setColonist2Id(long colonist2Id) {
        this.colonist2Id = colonist2Id;
    }
}
