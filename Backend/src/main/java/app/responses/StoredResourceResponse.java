package app.responses;

import app.model.StoredResource;

public class StoredResourceResponse {
    private StoredResource storedResource;
    private String resourceName;
    private String roomName;

    private StoredResourceResponse(){}

    public StoredResourceResponse(StoredResource storedResource, String resourceName, String roomName) {
        this.storedResource = storedResource;
        this.resourceName = resourceName;
        this.roomName = roomName;
    }

    public StoredResource getStoredResource() {
        return storedResource;
    }

    public void setStoredResource(StoredResource storedResource) {
        this.storedResource = storedResource;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
}
