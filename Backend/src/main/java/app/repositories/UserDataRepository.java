package app.repositories;

import app.model.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDataRepository extends JpaRepository<UserData, Long> {

    //UserData save(UserData userData);

    UserData findByLogin(String login);
}
