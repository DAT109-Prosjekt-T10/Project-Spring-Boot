package no.hvl.dat109.controller;

import java.util.List;
import java.util.Optional;

import no.hvl.dat109.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import no.hvl.dat109.entity.Publisher;
import no.hvl.dat109.repository.PublisherRepository;

@RestController
@RequestMapping("/api/publisher")
public class PublisherController {

    @Autowired
    private PublisherRepository publisherRepository;

    @Autowired
    private BookService bookService;

    @GetMapping("")
    public ResponseEntity<List<Publisher>> getAllPublishers(@RequestParam(required = false) String author) {
        List<Publisher> publishers = publisherRepository.findAll();
        return ResponseEntity.ok(publishers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Publisher> getAPublisherById(@PathVariable("id") long id) {
        Optional<Publisher> publisherData = publisherRepository.findById(id);
        return publisherData
                .map(publisher -> new ResponseEntity<>(publisher, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("")
    public ResponseEntity<Publisher> createPublisher(@RequestBody Publisher publisher) {
        try {
            Publisher savedPublisher = publisherRepository.save(new Publisher(publisher.getName()));
            return new ResponseEntity<>(savedPublisher, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Publisher> updatePublisher(@PathVariable("id") long id, @RequestBody Publisher publisher) {
        Optional<Publisher> publisherData = publisherRepository.findById(id);

        if (publisherData.isPresent()) {
            Publisher _publisher = publisherData.get();

            _publisher.setName(publisher.getName());
            _publisher.setBooks(publisher.getBooks());

            return new ResponseEntity<>(publisherRepository.save(_publisher), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Method to delete an author based on the author's id.
     *
     * @param id
     * @return ResponseEntity<HttpStatus>
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deletePublisher(@PathVariable("id") long id) {
        try {
            Publisher publisher = publisherRepository.findById(id).get();
            bookService.removePublisherFromBooks(publisher);
            publisherRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
