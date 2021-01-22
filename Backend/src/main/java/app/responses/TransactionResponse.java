package app.responses;

import app.model.Transaction;

public class TransactionResponse {
    private Transaction transaction;
    private String resourceName;
    private String roomName;
    private String colonyName;

    private TransactionResponse() {}

    public TransactionResponse(Transaction transaction, String resourceName, String roomName, String colonyName) {
        this.transaction = transaction;
        this.resourceName = resourceName;
        this.roomName = roomName;
        this.colonyName = colonyName;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
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

    public String getColonyName() {
        return colonyName;
    }

    public void setColonyName(String colonyName) {
        this.colonyName = colonyName;
    }
}
