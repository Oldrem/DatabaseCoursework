package app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "users")
@JsonIgnoreProperties({"password","hibernateLazyInitializer", "handler"})
public class User {
    @Id
    @Column(name = "login", nullable = false)
    private String login;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "roles")
    private String[] roles;

    public User(String login, String password, String... roles) {
        this.login = login;
        this.password = new BCryptPasswordEncoder().encode(password);
        this.roles = roles;
    }

    public User() {
    }


    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }

}
