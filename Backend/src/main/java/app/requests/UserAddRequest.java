package app.requests;

import app.model.Colonist;
import app.model.Occupation;
import app.model.User;
import app.repositories.ColonistRepository;
import app.repositories.OccupationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class UserAddRequest {
    private String login;
    private String password;

    public User createUser(){
        return new User(login, password, "USER");
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }
}
