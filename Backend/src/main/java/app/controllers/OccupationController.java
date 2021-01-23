package app.controllers;

import app.model.Occupation;
import app.repositories.OccupationRepository;
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
public class OccupationController {
    private OccupationRepository occupationRepository;

    public OccupationController(OccupationRepository occupationRepository) {
        this.occupationRepository = occupationRepository;
    }

    @GetMapping("/occupations")
    Collection<Occupation> occupations() {
        return (Collection<Occupation>) occupationRepository.findAll();
    }

    @GetMapping("/occupation/{id}")
    ResponseEntity<?> getOccupation(@PathVariable Long id) {
        Optional<Occupation> occupation = occupationRepository.findById(id);
        return occupation.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/occupation")
    ResponseEntity<Occupation> createOccupation(@Valid @RequestBody Occupation occupation) throws URISyntaxException {
        Occupation result = occupationRepository.save(occupation);
        return ResponseEntity.created(new URI("/occupation/" + result.getOccupationId()))
                .body(result);
    }

    @PutMapping("/occupation/{id}")
    ResponseEntity<Occupation> updateOccupation(@Valid @RequestBody Occupation occupation, @PathVariable Long id) {
        Occupation oldOccupation = occupationRepository.findByOccupationId(id);
        occupation.setColonists(oldOccupation.getColonists());
        Occupation result = occupationRepository.save(occupation);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/occupation/{id}")
    public ResponseEntity<?> deleteOccupation(@PathVariable Long id) {
        occupationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
