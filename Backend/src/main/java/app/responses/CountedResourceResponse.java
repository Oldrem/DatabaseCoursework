package app.responses;

import app.model.Resource;

import java.util.List;

public class CountedResourceResponse {
    private Resource resource;
    private long amount;
    private List<Long> roomIds;

    private CountedResourceResponse() {}

    public CountedResourceResponse(Resource resource, long amount, List<Long> roomIds) {
        this.resource = resource;
        this.amount = amount;
        this.roomIds = roomIds;
    }

    public Resource getResource() {
        return resource;
    }

    public void setResource(Resource resource) {
        this.resource = resource;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public List<Long> getRoomIds() {
        return roomIds;
    }

    public void setRoomIds(List<Long> roomIds) {
        this.roomIds = roomIds;
    }
}
