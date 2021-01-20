package app.controllers;

import app.model.Resource;
import app.repositories.ResourceRepository;
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
public class ResourceController {
    private ResourceRepository resourceRepository;

    public ResourceController(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    @GetMapping("/resources")
    Collection<Resource> resources() {
        return (Collection<Resource>) resourceRepository.findAll();
    }

    @GetMapping("/resource/{id}")
    ResponseEntity<?> getResource(@PathVariable Long id) {
        Optional<Resource> resource = resourceRepository.findById(id);
        return resource.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/resource")
    ResponseEntity<Resource> createResource(@Valid @RequestBody Resource resource) throws URISyntaxException {
        Resource result = resourceRepository.save(resource);
        return ResponseEntity.created(new URI("/resource/" + result.getResourceId()))
                .body(result);
    }

    @PutMapping("/resource/{id}")
    ResponseEntity<Resource> updateResource(@Valid @RequestBody Resource resource) {
        Resource result = resourceRepository.save(resource);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/resource/{id}")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {
        resourceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
