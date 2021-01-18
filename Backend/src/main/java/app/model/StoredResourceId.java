package app.model;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class StoredResourceId implements Serializable {
    private long resourceId;
    private long roomId;

    private StoredResourceId() {}

    public StoredResourceId(long resourceId, long roomId) {
        this.resourceId = resourceId;
        this.roomId = roomId;
    }

    public long getResourceId() {
        return resourceId;
    }

    public void setResourceId(long resourceId) {
        this.resourceId = resourceId;
    }

    public long getRoomId() {
        return roomId;
    }

    public void setRoomId(long roomId) {
        this.roomId = roomId;
    }
}
