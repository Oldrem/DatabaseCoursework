package app.controllers;

import app.model.Report;
import app.repositories.ReportRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ReportController {
    private ReportRepository reportRepository;

    public ReportController(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @GetMapping("/reports")
    Collection<Report> reports() {
        return (Collection<Report>) reportRepository.findAll();
    }

    @GetMapping("/reports/{login}")
    Collection<Report> getReports(@PathVariable String login) {
        return reportRepository.findAllByUserLogin(login);
    }

    @GetMapping("/reports/unreviewed")
    Collection<Report> getUnreviewedReports() {
        return reportRepository.findAllByIsReviewed(false);
    }

    @GetMapping("/report/{id}")
    ResponseEntity<?> getReport(@PathVariable Long id) {
        Optional<Report> report = reportRepository.findById(id);
        return report.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @PostMapping("/report")
    ResponseEntity<Report> createReport(@Valid @RequestBody Report report) throws URISyntaxException {
        Report result = reportRepository.save(report);
        return ResponseEntity.created(new URI("/report/" + result.getReportId()))
                .body(result);
    }

    @PutMapping("/report/{id}")
    ResponseEntity<Report> updateReport(@Valid @RequestBody Report report) {
        Report result = reportRepository.save(report);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/report/{id}")
    public ResponseEntity<?> deleteReport(@PathVariable Long id) {
        reportRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
