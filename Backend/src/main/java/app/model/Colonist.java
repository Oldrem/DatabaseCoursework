package app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.*;


@Entity
public class Colonist {
    private @Id @GeneratedValue Long colonistId;
    private String firstName;
    private String lastName;
    private String nickname;
    private String birthDate;
    private String colonyJoinDate;
    private String userLogin;


    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "colonist_occupation",
            joinColumns = { @JoinColumn(name = "colonist_id") },
            inverseJoinColumns = { @JoinColumn(name = "occupation_id") })
    @JsonIgnoreProperties("colonists")
    private Set<Occupation> occupations = new HashSet<>();

    private Colonist() {}

    public Colonist(String firstName, String lastName, String nickname, String birthDate, String colonyJoinDate, String userLogin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.birthDate = birthDate;
        this.colonyJoinDate = colonyJoinDate;
        this.userLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Colonist colonist = (Colonist) o;
        return colonistId.equals(colonist.colonistId) &&
                Objects.equals(firstName, colonist.firstName) &&
                Objects.equals(lastName, colonist.lastName) &&
                Objects.equals(nickname, colonist.nickname) &&
                Objects.equals(birthDate, colonist.birthDate) &&
                Objects.equals(colonyJoinDate, colonist.colonyJoinDate) &&
                userLogin.equals(colonist.userLogin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(colonistId, firstName, lastName, nickname, birthDate, colonyJoinDate, userLogin);
    }

    public Long getColonistId() {
        return colonistId;
    }

    public void setColonistId(Long colonistId) {
        this.colonistId = colonistId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getColonyJoinDate() {
        return colonyJoinDate;
    }

    public void setColonyJoinDate(String colonyJoinDate) {
        this.colonyJoinDate = colonyJoinDate;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public Set<Occupation> getOccupations() {
        return occupations;
    }

    public void setOccupations(Set<Occupation> occupations) {
        this.occupations = occupations;
    }
}


