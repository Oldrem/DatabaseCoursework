package app.repositories;

import app.model.Room;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoomRepository extends CrudRepository<Room, Long> {
    public Room findByRoomId(Long id);
    public Optional<Room> findByName(String name);
}
