package app.controllers;

import app.model.Colonist;
import app.model.Occupation;
import app.repositories.ColonistRepository;
import app.repositories.OccupationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class ColonistController {
    private ColonistRepository colonistRepository;
    private OccupationRepository occupationRepository;

    public ColonistController(ColonistRepository colonistRepository, OccupationRepository occupationRepository) {
        this.occupationRepository = occupationRepository;
        this.colonistRepository = colonistRepository;
    }

    @GetMapping("/colonists")
    Collection<Colonist> colonists() {
        return (Collection<Colonist>) colonistRepository.findAll();
    }

    @GetMapping("/colonist/{id}/occupations")
    Collection<Occupation> getColonistOccupations(@PathVariable Long id) {
        return colonistRepository.findByColonistId(id).getOccupations();
        //return colonistRepository.findById(id)
        //        .map(colonist -> (Collection<Occupation>) colonist.getOccupations())
        //        .orElseGet(new ArrayList<Occupation>());
    }

    @GetMapping("/colonistlogin/{login}/occupations")
    Collection<Occupation> getColonistOccupations(@PathVariable String login) {
        return colonistRepository.findByUserLogin(login).getOccupations();
        //return colonistRepository.findById(id)
        //        .map(colonist -> (Collection<Occupation>) colonist.getOccupations())
        //        .orElseGet(new ArrayList<Occupation>());
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

    @PutMapping("/colonist/addjob/{id}")
    Colonist addOccupation(@RequestBody Colonist newColonist, @PathVariable Long id) {
        Occupation occupation = occupationRepository.findByOccupationId(id);
        newColonist.getOccupations().add(occupation);
        return colonistRepository.save(newColonist);
    }

    @PutMapping("/colonist/removejob/{id}")
    Colonist removeOccupation(@RequestBody Colonist newColonist, @PathVariable Long id) {
        Occupation occupation = occupationRepository.findByOccupationId(id);
        newColonist.getOccupations().remove(occupation);
        return colonistRepository.save(newColonist);
    }

    @DeleteMapping("/colonist/{id}")
    public ResponseEntity<?> deleteColonist(@PathVariable Long id) {
        colonistRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
