package app.controllers;

import app.model.StoredResource;
import app.model.StoredResourceId;
import app.repositories.StoredResourceRepository;
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
public class StoredResourceController {
    private StoredResourceRepository storedResourceRepository;

    public StoredResourceController(StoredResourceRepository storedResourceRepository) {
        this.storedResourceRepository = storedResourceRepository;
    }

    @GetMapping("/storedResources")
    Collection<StoredResource> storedResources() {
        return (Collection<StoredResource>) storedResourceRepository.findAll();
    }

    @GetMapping("/storedResource/{id1}/{id2}")
    ResponseEntity<?> getStoredResource(@PathVariable Long id1, @PathVariable Long id2) {
        StoredResourceId id = new StoredResourceId(id1, id2);
        Optional<StoredResource> storedResource = storedResourceRepository.findByStoredResourceId(id);
        return storedResource.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/storedResource")
    ResponseEntity<StoredResource> createStoredResource(@Valid @RequestBody StoredResource storedResource) throws URISyntaxException {
        StoredResource result = storedResourceRepository.save(storedResource);
        return ResponseEntity.created(new URI("/storedResource/" + result.getStoredResourceId()))
                .body(result);
    }

    @PutMapping("/storedResource/{id}")
    ResponseEntity<StoredResource> updateStoredResource(@Valid @RequestBody StoredResource storedResource) {
        StoredResource result = storedResourceRepository.save(storedResource);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/storedResource/{id1}/{id2}")
    public ResponseEntity<?> deleteStoredResource(@PathVariable Long id1, @PathVariable Long id2) {
        StoredResourceId id = new StoredResourceId(id1, id2);
        storedResourceRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
