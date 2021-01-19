package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Animal {
    private @Id @GeneratedValue Long animalId;
    private String name;
    private Long animalTypeId;
    private Long responsibleColonistId;
    private Integer trainingProgress;
    private String lastResourceCollection;

    private Animal() {}

    public Animal(String name, Long animalTypeId, Long responsibleColonistId, Integer trainingProgress, String lastResourceCollection) {
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

    public Long getAnimalTypeId() {
        return animalTypeId;
    }

    public void setAnimalTypeId(Long animalTypeId) {
        this.animalTypeId = animalTypeId;
    }

    public Long getResponsibleColonistId() {
        return responsibleColonistId;
    }

    public void setResponsibleColonistId(Long responsibleColonistId) {
        this.responsibleColonistId = responsibleColonistId;
    }

    public Integer getTrainingProgress() {
        return trainingProgress;
    }

    public void setTrainingProgress(Integer trainingProgress) {
        this.trainingProgress = trainingProgress;
    }

    public String getLastResourceCollection() {
        return lastResourceCollection;
    }

    public void setLastResourceCollection(String lastResourceCollection) {
        this.lastResourceCollection = lastResourceCollection;
    }
}
