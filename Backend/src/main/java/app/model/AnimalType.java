package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "animal_type")
public class AnimalType {
    private @Id @GeneratedValue Long animalTypeId;
    private String name;
    private boolean canBeTrained;
    private long resourceId;

    private AnimalType() {}

    public AnimalType(String name, boolean canBeTrained, long resourceId) {
        this.name = name;
        this.canBeTrained = canBeTrained;
        this.resourceId = resourceId;
    }

    public Long getAnimalTypeId() {
        return animalTypeId;
    }

    public void setAnimalTypeId(Long animalTypeId) {
        this.animalTypeId = animalTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isCanBeTrained() {
        return canBeTrained;
    }

    public void setCanBeTrained(boolean canBeTrained) {
        this.canBeTrained = canBeTrained;
    }

    public long getResourceId() {
        return resourceId;
    }

    public void setResourceId(long resourceId) {
        this.resourceId = resourceId;
    }
}
