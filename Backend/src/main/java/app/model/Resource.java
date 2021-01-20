package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Resource {
    private @Id @GeneratedValue Long resourceId;
    private String name;
    private Integer price;
    private Integer flammability;
    private boolean isForbidden;

    private Resource() {}

    public Resource(String name, Integer price, Integer flammability, boolean isForbidden) {
        this.name = name;
        this.price = price;
        this.flammability = flammability;
        this.isForbidden = isForbidden;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getFlammability() {
        return flammability;
    }

    public void setFlammability(Integer flammability) {
        this.flammability = flammability;
    }

    public boolean isForbidden() {
        return isForbidden;
    }

    public void setForbidden(boolean forbidden) {
        isForbidden = forbidden;
    }
}
