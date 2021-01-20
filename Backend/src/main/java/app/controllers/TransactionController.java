package app.controllers;

import app.model.Transaction;
import app.repositories.TransactionRepository;
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
public class TransactionController {
    private TransactionRepository transactionRepository;

    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @GetMapping("/transactions")
    Collection<Transaction> transactions() {
        return (Collection<Transaction>) transactionRepository.findAll();
    }

    @GetMapping("/transaction/{id}")
    ResponseEntity<?> getTransaction(@PathVariable Long id) {
        Optional<Transaction> transaction = transactionRepository.findById(id);
        return transaction.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/transaction")
    ResponseEntity<Transaction> createTransaction(@Valid @RequestBody Transaction transaction) throws URISyntaxException {
        Transaction result = transactionRepository.save(transaction);
        return ResponseEntity.created(new URI("/transaction/" + result.getTransactionId()))
                .body(result);
    }

    @PutMapping("/transaction/{id}")
    ResponseEntity<Transaction> updateTransaction(@Valid @RequestBody Transaction transaction) {
        Transaction result = transactionRepository.save(transaction);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/transaction/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        transactionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
