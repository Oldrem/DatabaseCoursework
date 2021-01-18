package app.model;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class ColonyRelationId implements Serializable {
    private long colony1Id;
    private long colony2Id;

    ColonyRelationId() {}

    public ColonyRelationId(long colony1Id, long colony2Id) {
        this.colony1Id = colony1Id;
        this.colony2Id = colony2Id;
    }

    public long getColony1Id() {
        return colony1Id;
    }

    public void setColony1Id(long colony1Id) {
        this.colony1Id = colony1Id;
    }

    public long getColony2Id() {
        return colony2Id;
    }

    public void setColony2Id(long colony2Id) {
        this.colony2Id = colony2Id;
    }
}
