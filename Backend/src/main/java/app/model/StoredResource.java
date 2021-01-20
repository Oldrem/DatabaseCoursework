package app.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "stored_resource")
public class StoredResource {
    @EmbeddedId StoredResourceId storedResourceId;
    private Integer amount;

    private StoredResource() {}

    public StoredResource(long resourceId, long roomId, Integer amount) {
        this.amount = amount;
    }

    public StoredResourceId getStoredResourceId() {
        return storedResourceId;
    }

    public void setStoredResourceId(StoredResourceId storedResourceId) {
        this.storedResourceId = storedResourceId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
