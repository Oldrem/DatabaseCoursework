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

    @GetMapping("/colonist/{login}")
    ResponseEntity<?> getColonist(@PathVariable String login) {
        Colonist colonist = colonistRepository.findByUserLogin(login);
        return ResponseEntity.ok().body(colonist);
    }

    @PostMapping("/colonist")
    ResponseEntity<Colonist> createColonist(@Valid @RequestBody Colonist colonist) throws URISyntaxException {
        Colonist result = colonistRepository.save(colonist);
        return ResponseEntity.created(new URI("/colonist/" + result.getColonistId()))
                .body(result);
    }

    @PutMapping("/colonist/{id}")
    Colonist replaceColonist(@RequestBody Colonist newColonist, @PathVariable Long id) {
        return colonistRepository.findById(id)
                .map(employee -> {
                    employee.setFirstName(newColonist.getFirstName());
                    employee.setLastName(newColonist.getLastName());
                    employee.setNickname(newColonist.getNickname());
                    return colonistRepository.save(employee);
                })
                .orElseGet(() -> {
                    newColonist.setColonistId(id);
                    return colonistRepository.save(newColonist);
                });
    }

    @DeleteMapping("/colonist/{id}")
    public ResponseEntity<?> deleteColonist(@PathVariable Long id) {
        colonistRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
