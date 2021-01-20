package app.model;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class StoredResourceId implements Serializable {
    private Long resource_id;
    private Long room_id;

    private StoredResourceId() {}

    public StoredResourceId(Long resourceId, Long roomId) {
        this.resource_id = resourceId;
        this.room_id = roomId;
    }

    public Long getResourceId() {
        return resource_id;
    }

    public void setResourceId(Long resourceId) {
        this.resource_id = resourceId;
    }

    public Long getRoomId() {
        return room_id;
    }

    public void setRoomId(Long roomId) {
        this.room_id = roomId;
    }
}
