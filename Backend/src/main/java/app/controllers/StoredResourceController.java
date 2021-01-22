package app.controllers;

import app.model.*;
import app.repositories.ResourceRepository;
import app.repositories.RoomRepository;
import app.repositories.StoredResourceRepository;
import app.responses.CountedResourceResponse;
import app.responses.StoredResourceResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

@RestController
@RequestMapping("/api")
public class StoredResourceController {
    private StoredResourceRepository storedResourceRepository;
    private ResourceRepository resourceRepository;
    private RoomRepository roomRepository;

    public StoredResourceController(StoredResourceRepository storedResourceRepository, ResourceRepository resourceRepository, RoomRepository roomRepository) {
        this.storedResourceRepository = storedResourceRepository;
        this.resourceRepository = resourceRepository;
        this.roomRepository = roomRepository;
    }

    @GetMapping("/storedResources")
    Collection<StoredResourceResponse> storedResources() {
        Collection<StoredResource> storedResources = (Collection<StoredResource>) storedResourceRepository.findAll();
        Collection<Resource> resources = (Collection<Resource>) resourceRepository.findAll();
        Collection<Room> rooms = (Collection<Room>) roomRepository.findAll();
        List<StoredResourceResponse> storedResourceResponses = new ArrayList<>();
        for(StoredResource storedResource : storedResources) {
            Room room = rooms.stream()
                    .filter(rm -> storedResource.getStoredResourceId().getRoomId().equals(rm.getRoomId()))
                    .findAny()
                    .orElse(null);
            Resource resource = resources.stream()
                    .filter(rs -> storedResource.getStoredResourceId().getResourceId().equals(rs.getResourceId()))
                    .findAny()
                    .orElse(null);
            storedResourceResponses.add(new StoredResourceResponse(storedResource, resource.getName(), room.getName()));
        }
        return storedResourceResponses;
    }

    @GetMapping("/resourceCount")
    Collection<CountedResourceResponse> countedResources() {
        Collection<StoredResource> storedResources = (Collection<StoredResource>) storedResourceRepository.findAll();
        Collection<Resource> resources = (Collection<Resource>) resourceRepository.findAll();
        List<CountedResourceResponse> countedResourceResponses = new ArrayList<>();
        for(Resource resource : resources) {
            long amount = 0;
            List<Long> roomIds = new ArrayList<>();
            for(StoredResource stored : storedResources){
                if (resource.getResourceId().equals(stored.getStoredResourceId().getResourceId())){
                    amount += stored.getAmount();
                    roomIds.add(stored.getStoredResourceId().getRoomId());
                }
            }
            countedResourceResponses.add(new CountedResourceResponse(resource, amount, roomIds));
        }
        return countedResourceResponses;
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
