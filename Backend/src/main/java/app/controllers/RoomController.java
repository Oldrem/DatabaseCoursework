package app.controllers;

import app.model.Room;
import app.repositories.RoomRepository;
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
public class RoomController {
    private RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @GetMapping("/rooms")
    Collection<Room> rooms() {
        return (Collection<Room>) roomRepository.findAll();
    }

    @GetMapping("/room/{id}")
    ResponseEntity<?> getRoom(@PathVariable Long id) {
        Optional<Room> room = roomRepository.findById(id);
        return room.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/room")
    ResponseEntity<Room> createRoom(@Valid @RequestBody Room room) throws URISyntaxException {
        Room result = roomRepository.save(room);
        return ResponseEntity.created(new URI("/room/" + result.getRoomId()))
                .body(result);
    }

    @PutMapping("/room/{id}")
    ResponseEntity<Room> updateRoom(@Valid @RequestBody Room room) {
        Room result = roomRepository.save(room);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/room/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
        roomRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
