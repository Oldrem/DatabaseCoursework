package app.model;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class RelationshipId implements Serializable {
    private Long colonist1_id;
    private Long colonist2_id;

    private RelationshipId() {}

    public RelationshipId(Long colonist1Id, Long colonist2Id) {
        this.colonist1_id = colonist1Id;
        this.colonist2_id = colonist2Id;
    }

    public Long getColonist1Id() {
        return colonist1_id;
    }

    public void setColonist1Id(Long colonist1Id) {
        this.colonist1_id = colonist1Id;
    }

    public Long getColonist2Id() {
        return colonist2_id;
    }

    public void setColonist2Id(Long colonist2Id) {
        this.colonist2_id = colonist2Id;
    }
}
