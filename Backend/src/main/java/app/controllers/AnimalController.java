package app.controllers;

import app.model.Animal;
import app.repositories.AnimalRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AnimalController {
    private AnimalRepository animalRepository;

    public AnimalController(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    @GetMapping("/animals")
    Collection<Animal> animals() {
        return (Collection<Animal>) animalRepository.findAll();
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
