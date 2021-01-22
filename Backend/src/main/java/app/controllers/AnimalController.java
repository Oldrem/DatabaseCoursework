package app.controllers;

import app.model.Animal;
import app.model.AnimalType;
import app.model.Colonist;
import app.repositories.AnimalRepository;
import app.repositories.AnimalTypeRepository;
import app.repositories.ColonistRepository;
import app.responses.AnimalResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AnimalController {
    private AnimalRepository animalRepository;
    private AnimalTypeRepository animalTypeRepository;
    private ColonistRepository colonistRepository;

    public AnimalController(AnimalRepository animalRepository, AnimalTypeRepository animalTypeRepository, ColonistRepository colonistRepository) {
        this.animalRepository = animalRepository ;
        this.animalTypeRepository = animalTypeRepository;
        this.colonistRepository = colonistRepository;
    }

    @GetMapping("/animals")
    Collection<AnimalResponse> animals()  {
        Collection<Animal> animals = (Collection<Animal>) animalRepository.findAll();
        List<AnimalResponse> animalResponses = new ArrayList<>();
        for(Animal animal : animals) {
            AnimalType animalType = animalTypeRepository.findByAnimalTypeId(animal.getAnimalTypeId());
            Colonist colonist = colonistRepository.findByColonistId(animal.getResponsibleColonistId());
            if (colonist != null) {
                animalResponses.add(new AnimalResponse(animal, animalType.getName(), colonist.getNickname()));
            }
            else {
                animalResponses.add(new AnimalResponse(animal, animalType.getName(), "-"));
            }
        }
        return animalResponses;
    }

    @GetMapping("/animal/{id}")
    ResponseEntity<?> getAnimal(@PathVariable Long id) {
        Optional<Animal> animal = animalRepository.findById(id);
        return animal.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/animal")
    ResponseEntity<Animal> createAnimal(@Valid @RequestBody Animal animal) throws URISyntaxException {
        Animal result = animalRepository.save(animal);
        return ResponseEntity.created(new URI("/animal/" + result.getAnimalId()))
                .body(result);
    }

    @PutMapping("/animal/{id}")
    ResponseEntity<Animal> updateAnimal(@Valid @RequestBody Animal animal) {
        Animal result = animalRepository.save(animal);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/animal/{id}")
    public ResponseEntity<?> deleteAnimal(@PathVariable Long id) {
        animalRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
