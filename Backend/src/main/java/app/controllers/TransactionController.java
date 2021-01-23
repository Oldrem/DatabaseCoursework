package app.controllers;

import app.model.Colony;
import app.model.Resource;
import app.model.Room;
import app.model.Transaction;
import app.repositories.ColonyRepository;
import app.repositories.ResourceRepository;
import app.repositories.RoomRepository;
import app.repositories.TransactionRepository;
import app.responses.AmountResponse;
import app.responses.TransactionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class TransactionController {
    private TransactionRepository transactionRepository;
    private ResourceRepository resourceRepository;
    private RoomRepository roomRepository;
    private ColonyRepository colonyRepository;

    public TransactionController(TransactionRepository transactionRepository, ResourceRepository resourceRepository, RoomRepository roomRepository, ColonyRepository colonyRepository) {
        this.transactionRepository = transactionRepository;
        this.resourceRepository = resourceRepository;
        this.roomRepository = roomRepository;
        this.colonyRepository = colonyRepository;
    }

    @GetMapping("/transactions")
    Collection<TransactionResponse> transactions() {
        Collection<Transaction> transactions = (Collection<Transaction>) transactionRepository.findAll();
        Collection<Resource> resources = (Collection<Resource>) resourceRepository.findAll();
        Collection<Room> rooms = (Collection<Room>) roomRepository.findAll();
        Collection<Colony> colonies = (Collection<Colony>) colonyRepository.findAll();
        List<TransactionResponse> transactionResponses = new ArrayList<>();
        for(Transaction transaction : transactions) {
            Room room = rooms.stream()
                    .filter(rm -> transaction.getRoomId().equals(rm.getRoomId()))
                    .findAny()
                    .orElse(null);
            Resource resource = resources.stream()
                    .filter(rs -> transaction.getResourceId().equals(rs.getResourceId()))
                    .findAny()
                    .orElse(null);
            Colony colony = colonies.stream()
                    .filter(rs -> transaction.getColonyId().equals(rs.getColonyId()))
                    .findAny()
                    .orElse(null);
            transactionResponses.add(new TransactionResponse(transaction, resource.getName(), room.getName(), colony.getName()));
        }
        return transactionResponses;
    }

    @GetMapping("/transactions/{from}/{to}")
    Collection<TransactionResponse> transactions(@PathVariable Long from, @PathVariable Long to) {
        Collection<Transaction> transactions = (Collection<Transaction>) transactionRepository.findAll();
        Collection<Resource> resources = (Collection<Resource>) resourceRepository.findAll();
        Collection<Room> rooms = (Collection<Room>) roomRepository.findAll();
        Collection<Colony> colonies = (Collection<Colony>) colonyRepository.findAll();
        List<TransactionResponse> transactionResponses = new ArrayList<>();
        long counter = 0;
        for(Transaction transaction : transactions) {
            counter++;
            if (counter < from) continue;
            if (counter > to) break;
            Room room = rooms.stream()
                    .filter(rm -> transaction.getRoomId().equals(rm.getRoomId()))
                    .findAny()
                    .orElse(null);
            Resource resource = resources.stream()
                    .filter(rs -> transaction.getResourceId().equals(rs.getResourceId()))
                    .findAny()
                    .orElse(null);
            Colony colony = colonies.stream()
                    .filter(rs -> transaction.getColonyId().equals(rs.getColonyId()))
                    .findAny()
                    .orElse(null);
            transactionResponses.add(new TransactionResponse(transaction, resource.getName(), room.getName(), colony.getName()));
        }
        return transactionResponses;
    }

    @GetMapping("/transactions/amount")
    AmountResponse transactionAmount() {
        Collection<Transaction> transactions = (Collection<Transaction>) transactionRepository.findAll();
        return new AmountResponse(transactions.size());
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
