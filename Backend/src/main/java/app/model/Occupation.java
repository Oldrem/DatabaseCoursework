package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Occupation {
    private @Id @GeneratedValue Long occupationId;
    private String name;
    private String description;
    private String timeStarts;
    private String timeEnds;

    public Occupation() {}

    public Occupation(String name, String description, String timeStarts, String timeEnds) {
        this.name = name;
        this.description = description;
        this.timeStarts = timeStarts;
        this.timeEnds = timeEnds;
    }

    public Long getOccupationId() {
        return occupationId;
    }

    public void setOccupationId(Long occupationId) {
        this.occupationId = occupationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTimeStarts() {
        return timeStarts;
    }

    public void setTimeStarts(String timeStarts) {
        this.timeStarts = timeStarts;
    }

    public String getTimeEnds() {
        return timeEnds;
    }

    public void setTimeEnds(String timeEnds) {
        this.timeEnds = timeEnds;
    }
}
