package app.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class StoredResource {
    @EmbeddedId StoredResourceId storedResourceId;
    private int amount;

    private StoredResource() {}

    public StoredResource(long resourceId, long roomId, int amount) {
        this.amount = amount;
    }

    public StoredResourceId getStoredResourceId() {
        return storedResourceId;
    }

    public void setStoredResourceId(StoredResourceId storedResourceId) {
        this.storedResourceId = storedResourceId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
