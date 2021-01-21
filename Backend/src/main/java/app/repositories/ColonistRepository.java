package app.repositories;

import app.model.Colonist;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ColonistRepository extends CrudRepository<Colonist, Long> {
    Colonist findByUserLogin(String login);
    Colonist findByColonistId(Long id);
}
