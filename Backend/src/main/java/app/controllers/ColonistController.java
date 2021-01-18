package app.controllers;

import app.model.Colonist;
import app.repositories.ColonistRepository;
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
public class ColonistController {
    private ColonistRepository colonistRepository;

    public ColonistController(ColonistRepository colonistRepository) {
        this.colonistRepository = colonistRepository;
    }

    @GetMapping("/colonists")
    Collection<Colonist> colonists() {
        return (Collection<Colonist>) colonistRepository.findAll();
    }

    @GetMapping("/colonist/{id}")
    ResponseEntity<?> getColonist(@PathVariable Long id) {
        Optional<Colonist> colonist = colonistRepository.findById(id);
        return colonist.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/colonist")
    ResponseEntity<Colonist> createColonist(@Valid @RequestBody Colonist colonist) throws URISyntaxException {
        Colonist result = colonistRepository.save(colonist);
        return ResponseEntity.created(new URI("/colonist/" + result.getColonistId()))
                .body(result);
    }

    @PutMapping("/colonist/{id}")
    ResponseEntity<Colonist> updateColonist(@Valid @RequestBody Colonist colonist) {
        Colonist result = colonistRepository.save(colonist);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/colonist/{id}")
    public ResponseEntity<?> deleteColonist(@PathVariable Long id) {
        colonistRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
