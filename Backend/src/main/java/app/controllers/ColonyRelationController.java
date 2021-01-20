package app.controllers;

import app.model.ColonyRelation;
import app.model.ColonyRelation;
import app.model.ColonyRelationId;
import app.repositories.ColonyRelationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ColonyRelationController {
    private ColonyRelationRepository colonyRelationRepository;

    public ColonyRelationController(ColonyRelationRepository colonyRelationRepository) {
        this.colonyRelationRepository = colonyRelationRepository;
    }

    @GetMapping("/colonyRelations")
    Collection<ColonyRelation> colonyRelations() {
        return (Collection<ColonyRelation>) colonyRelationRepository.findAll();
    }

    @GetMapping("/colonyRelation/{id1}/{id2}")
    ResponseEntity<?> getColonyRelation(@PathVariable Long id1, @PathVariable Long id2) {
        ColonyRelationId id = new ColonyRelationId(id1, id2);
        Optional<ColonyRelation> colonyRelation = colonyRelationRepository.findByColonyRelationId(id);
        return colonyRelation.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/colonyRelation")
    ResponseEntity<ColonyRelation> createColonyRelation(@Valid @RequestBody ColonyRelation colonyRelation) throws URISyntaxException {
        ColonyRelation result = colonyRelationRepository.save(colonyRelation);
        return ResponseEntity.created(new URI("/colonyRelation/" + result.getColonyRelationId()))
                .body(result);
    }

    @PutMapping("/colonyRelation/{id}")
    ResponseEntity<ColonyRelation> updateColonyRelation(@Valid @RequestBody ColonyRelation colonyRelation) {
        ColonyRelation result = colonyRelationRepository.save(colonyRelation);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/colonyRelation/{id1}/{id2}")
    public ResponseEntity<?> deleteColonyRelation(@PathVariable Long id1, @PathVariable Long id2) {
        ColonyRelationId id = new ColonyRelationId(id1, id2);
        colonyRelationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
