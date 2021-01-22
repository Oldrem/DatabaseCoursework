package app.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class RelationshipId implements Serializable {
    @Column(name="colonist1_id")
    private Long colonist1Id;
    @Column(name="colonist2_id")
    private Long colonist2Id;

    private RelationshipId() {}

    public RelationshipId(Long colonist1Id, Long colonist2Id) {
        this.colonist1Id = colonist1Id;
        this.colonist2Id = colonist2Id;
    }

    public Long getColonist1Id() {
        return colonist1Id;
    }

    public void setColonist1Id(Long colonist1Id) {
        this.colonist1Id = colonist1Id;
    }

    public Long getColonist2Id() {
        return colonist2Id;
    }

    public void setColonist2Id(Long colonist2Id) {
        this.colonist2Id = colonist2Id;
    }
}
