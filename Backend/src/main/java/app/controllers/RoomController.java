package app.controllers;

import app.model.Room;
import app.model.RoomType;
import app.repositories.RoomRepository;
import app.repositories.RoomTypeRepository;
import app.responses.RoomResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RoomController {
    private RoomRepository roomRepository;
    private RoomTypeRepository roomTypeRepository;

    public RoomController(RoomRepository roomRepository, RoomTypeRepository roomTypeRepository) {
        this.roomRepository = roomRepository;
        this.roomTypeRepository = roomTypeRepository;
    }

    @GetMapping("/rooms")
    Collection<RoomResponse> rooms() {
        Collection<Room> rooms = (Collection<Room>) roomRepository.findAll();
        List<RoomResponse> roomResponses = new ArrayList<>();
        for(Room room : rooms) {
            RoomType roomType = roomTypeRepository.findByRoomTypeId(room.getRoomTypeId());
            roomResponses.add(new RoomResponse(room, roomType.getName()));
        }
        return roomResponses;
    }

    @GetMapping("/room/{id}")
    ResponseEntity<?> getRoom(@PathVariable Long id) {
        Optional<Room> room = roomRepository.findById(id);
        return room.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/roomname/{name}")
    ResponseEntity<?> getRoomByName(@PathVariable String name) {
        Optional<Room> room = roomRepository.findByName(name);
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
