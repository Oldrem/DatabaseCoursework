package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class RoomType {
    private @Id @GeneratedValue Long roomTypeId;
    private String name;
    private String accessLevel;
    private String requiredEquipment;
    private String sanitaryConditions;

    private RoomType() {}

    public RoomType(String name, String accessLevel, String requiredEquipment, String sanitaryConditions) {
        this.name = name;
        this.accessLevel = accessLevel;
        this.requiredEquipment = requiredEquipment;
        this.sanitaryConditions = sanitaryConditions;
    }

    public Long getRoomTypeId() {
        return roomTypeId;
    }

    public void setRoomTypeId(Long roomTypeId) {
        this.roomTypeId = roomTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAccessLevel() {
        return accessLevel;
    }

    public void setAccessLevel(String accessLevel) {
        this.accessLevel = accessLevel;
    }

    public String getRequiredEquipment() {
        return requiredEquipment;
    }

    public void setRequiredEquipment(String requiredEquipment) {
        this.requiredEquipment = requiredEquipment;
    }

    public String getSanitaryConditions() {
        return sanitaryConditions;
    }

    public void setSanitaryConditions(String sanitaryConditions) {
        this.sanitaryConditions = sanitaryConditions;
    }
}
