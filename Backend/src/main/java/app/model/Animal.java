package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Animal {
    private @Id @GeneratedValue Long animalId;
    private String name;
    private long animalTypeId;
    private long responsibleColonistId;
    private int trainingProgress;
    private String lastResourceCollection;

    private Animal() {}

    public Animal(String name, long animalTypeId, long responsibleColonistId, int trainingProgress, String lastResourceCollection) {
        this.name = name;
        this.animalTypeId = animalTypeId;
        this.responsibleColonistId = responsibleColonistId;
        this.trainingProgress = trainingProgress;
        this.lastResourceCollection = lastResourceCollection;
    }

    public Long getAnimalId() {
        return animalId;
    }

    public void setAnimalId(Long animalId) {
        this.animalId = animalId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getAnimalTypeId() {
        return animalTypeId;
    }

    public void setAnimalTypeId(long animalTypeId) {
        this.animalTypeId = animalTypeId;
    }

    public long getResponsibleColonistId() {
        return responsibleColonistId;
    }

    public void setResponsibleColonistId(long responsibleColonistId) {
        this.responsibleColonistId = responsibleColonistId;
    }

    public int getTrainingProgress() {
        return trainingProgress;
    }

    public void setTrainingProgress(int trainingProgress) {
        this.trainingProgress = trainingProgress;
    }

    public String getLastResourceCollection() {
        return lastResourceCollection;
    }

    public void setLastResourceCollection(String lastResourceCollection) {
        this.lastResourceCollection = lastResourceCollection;
    }
}
