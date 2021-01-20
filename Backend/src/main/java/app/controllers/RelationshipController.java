package app.controllers;

import app.model.Relationship;
import app.model.RelationshipId;
import app.repositories.RelationshipRepository;
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
public class RelationshipController {
    private RelationshipRepository relationshipRepository;

    public RelationshipController(RelationshipRepository relationshipRepository) {
        this.relationshipRepository = relationshipRepository;
    }

    @GetMapping("/relationships")
    Collection<Relationship> relationships() {
        return (Collection<Relationship>) relationshipRepository.findAll();
    }

    @GetMapping("/relationship/{id1}/{id2}")
    ResponseEntity<?> getRelationship(@PathVariable Long id1, @PathVariable Long id2) {
        RelationshipId id = new RelationshipId(id1, id2);
        Optional<Relationship> relationship = relationshipRepository.findByRelationshipId(id);
        return relationship.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/relationship")
    ResponseEntity<Relationship> createRelationship(@Valid @RequestBody Relationship relationship) throws URISyntaxException {
        Relationship result = relationshipRepository.save(relationship);
        return ResponseEntity.created(new URI("/relationship/" + result.getRelationshipId()))
                .body(result);
    }

    @PutMapping("/relationship/{id}")
    ResponseEntity<Relationship> updateRelationship(@Valid @RequestBody Relationship relationship) {
        Relationship result = relationshipRepository.save(relationship);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/relationship/{id1}/{id2}")
    public ResponseEntity<?> deleteRelationship(@PathVariable Long id1, @PathVariable Long id2) {
        RelationshipId id = new RelationshipId(id1, id2);
        relationshipRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
