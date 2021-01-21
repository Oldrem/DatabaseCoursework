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

    private Colonist() {}

    public Colonist(String firstName, String lastName, String nickname, String birthDate, String colonyJoinDate, String userLogin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.birthDate = birthDate;
        this.colonyJoinDate = colonyJoinDate;
        this.userLogin = userLogin;
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
}


