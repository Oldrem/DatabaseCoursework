package app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Colony {
    private @Id @GeneratedValue Long colonyId;
    private String name;
    private String leaderName;
    private String leaderLastName;
    private int population;

    public Colony() {}

    public Colony(String name, String leaderName, String leaderLastName, int population) {
        this.name = name;
        this.leaderName = leaderName;
        this.leaderLastName = leaderLastName;
        this.population = population;
    }

    public Long getColonyId() {
        return colonyId;
    }

    public void setColonyId(Long colonyId) {
        this.colonyId = colonyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLeaderName() {
        return leaderName;
    }

    public void setLeaderName(String leaderName) {
        this.leaderName = leaderName;
    }

    public String getLeaderLastName() {
        return leaderLastName;
    }

    public void setLeaderLastName(String leaderLastName) {
        this.leaderLastName = leaderLastName;
    }

    public int getPopulation() {
        return population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }
}
