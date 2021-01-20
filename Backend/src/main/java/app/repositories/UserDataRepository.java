package app.repositories;

import app.model.UserData;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface UserDataRepository extends Repository<UserData, Long> {

    UserData save(UserData manager);

    UserData findByLogin(String login);
}
