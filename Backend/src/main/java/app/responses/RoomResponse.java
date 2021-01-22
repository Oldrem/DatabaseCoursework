package app.responses;

import app.model.Room;

public class RoomResponse {
    private Room room;
    private String roomTypeName;

    private RoomResponse() {}

    public RoomResponse(Room room, String roomTypeName) {
        this.room = room;
        this.roomTypeName = roomTypeName;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public String getRoomTypeName() {
        return roomTypeName;
    }

    public void setRoomTypeName(String roomTypeName) {
        this.roomTypeName = roomTypeName;
    }
}
