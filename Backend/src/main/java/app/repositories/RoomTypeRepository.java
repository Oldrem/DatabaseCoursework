package app.repositories;

import app.model.RoomType;
import org.springframework.data.repository.CrudRepository;

public interface RoomTypeRepository extends CrudRepository<RoomType, Long> {
    public RoomType findByRoomTypeId(Long id);
}
