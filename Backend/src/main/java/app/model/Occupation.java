package app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Occupation {
    private @Id @GeneratedValue Long occupationId;
    private String name;
    private String description;
    private LocalTime timeStarts;
    private LocalTime timeEnds;

    @JsonIgnoreProperties("occupations")
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "occupations")
    private Set<Colonist> colonists = new HashSet<>();

    public Occupation() {}

    public Occupation(String name, String description, LocalTime timeStarts, LocalTime timeEnds) {
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

    public LocalTime getTimeStarts() {
        return timeStarts;
    }

    public void setTimeStarts(LocalTime timeStarts) {
        this.timeStarts = timeStarts;
    }

    public LocalTime getTimeEnds() {
        return timeEnds;
    }

    public void setTimeEnds(LocalTime timeEnds) {
        this.timeEnds = timeEnds;
    }

    public Set<Colonist> getColonists() {
        return colonists;
    }

    public void setColonists(Set<Colonist> colonists) {
        this.colonists = colonists;
    }
}
