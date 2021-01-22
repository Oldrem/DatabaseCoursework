package app.responses;

import app.model.Animal;
import app.model.AnimalType;

public class AnimalResponse {
    private Animal animal;
    private String animalTypeName;
    private String colonistNickname;

    private AnimalResponse() {}

    public AnimalResponse(Animal animal, String animalTypeName, String colonistNickname) {
        this.animal = animal;
        this.animalTypeName = animalTypeName;
        this.colonistNickname = colonistNickname;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }

    public String getAnimalTypeName() {
        return animalTypeName;
    }

    public void setAnimalTypeName(String animalTypeName) {
        this.animalTypeName = animalTypeName;
    }

    public String getColonistNickname() {
        return colonistNickname;
    }

    public void setColonistNickname(String colonistNickname) {
        this.colonistNickname = colonistNickname;
    }
}
