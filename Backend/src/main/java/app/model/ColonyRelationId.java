package app.model;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ColonyRelationId implements Serializable {
    private Long colony1_id;
    private Long colony2_id;

    ColonyRelationId() {}

    public ColonyRelationId(Long colony1Id, Long colony2Id) {
        this.colony1_id = colony1Id;
        this.colony2_id = colony2Id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ColonyRelationId that = (ColonyRelationId) o;
        return colony1_id.equals(that.colony1_id) &&
                colony2_id.equals(that.colony2_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(colony1_id, colony2_id);
    }

    public Long getColony1Id() {
        return colony1_id;
    }

    public void setColony1Id(Long colony1Id) {
        this.colony1_id = colony1Id;
    }

    public Long getColony2Id() {
        return colony2_id;
    }

    public void setColony2Id(Long colony2Id) {
        this.colony2_id = colony2Id;
    }
}
