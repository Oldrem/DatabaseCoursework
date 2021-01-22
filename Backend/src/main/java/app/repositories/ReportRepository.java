package app.repositories;

import app.model.Report;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;

public interface ReportRepository extends CrudRepository<Report, Long> {
    Report findByUserLogin(String login);
    Collection<Report> findAllByIsReviewed(Boolean isReviewed);
    Collection<Report> findAllByIsReviewed(String isReviewed);
    Collection<Report> findAllByUserLogin(String login);
}
