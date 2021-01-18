package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Transaction {
    private @Id @GeneratedValue Long transactionId;
    private long resourceId;
    private long roomId;
    private long colonyId;
    private int amount;

    private Transaction() {}

    public Transaction(long resourceId, long roomId, long colonyId, int amount) {
        this.resourceId = resourceId;
        this.roomId = roomId;
        this.colonyId = colonyId;
        this.amount = amount;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public long getResourceId() {
        return resourceId;
    }

    public void setResourceId(long resourceId) {
        this.resourceId = resourceId;
    }

    public long getRoomId() {
        return roomId;
    }

    public void setRoomId(long roomId) {
        this.roomId = roomId;
    }

    public long getColonyId() {
        return colonyId;
    }

    public void setColonyId(long colonyId) {
        this.colonyId = colonyId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
