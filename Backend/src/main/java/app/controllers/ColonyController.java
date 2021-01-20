package app.controllers;

import app.model.Colony;
import app.repositories.ColonyRepository;
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
public class ColonyController {
    private ColonyRepository colonyRepository;

    public ColonyController(ColonyRepository colonyRepository) {
        this.colonyRepository = colonyRepository;
    }

    @GetMapping("/colonies")
    Collection<Colony> colonies() {
        return (Collection<Colony>) colonyRepository.findAll();
    }

    @GetMapping("/colony/{id}")
    ResponseEntity<?> getColony(@PathVariable Long id) {
        Optional<Colony> colony = colonyRepository.findById(id);
        return colony.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/colony")
    ResponseEntity<Colony> createColony(@Valid @RequestBody Colony colony) throws URISyntaxException {
        Colony result = colonyRepository.save(colony);
        return ResponseEntity.created(new URI("/colony/" + result.getColonyId()))
                .body(result);
    }

    @PutMapping("/colony/{id}")
    ResponseEntity<Colony> updateColony(@Valid @RequestBody Colony colony) {
        Colony result = colonyRepository.save(colony);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/colony/{id}")
    public ResponseEntity<?> deleteColony(@PathVariable Long id) {
        colonyRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
