package no.hvl.dat109.controller;

import java.util.List;
import java.util.Optional;

import no.hvl.dat109.service.BookService;
import no.hvl.dat109.service.PublisherService;
import no.hvl.dat109.util.ApiError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
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

    @Autowired
    private PublisherService publisherService;

    @GetMapping("")
    public ResponseEntity<Object> getAllPublishers(@RequestParam(required = false) String author) {
        List<Publisher> publishers = publisherRepository.findAll();
        return ResponseEntity.ok(publishers);
    }

    /**
     * Method to fetch a publisher by ID
     *
     * @param id
     * @return ResponseEntity<Publisher>
     */
    @GetMapping("/{id}")
    public ResponseEntity<Object> getAPublisherById(@PathVariable("id") long id) {
        Optional<Object> publisherData = Optional.of(publisherRepository.findById(id));
        return publisherData
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(new ApiError("Publisher does not exist on server.")));
    }

    /**
     * Method to create a new publisher
     *
     * @param publisher
     * @return ResponseEntity<Publisher>
     */
    @PostMapping("")
    public ResponseEntity<Object> createPublisher(@RequestBody Publisher publisher) {
        try {
            if (publisherService.publisherWithNameExists(publisher.getName()) == -1) {
                Publisher savedPublisher = publisherRepository.save(publisher);
                return ResponseEntity.ok(savedPublisher);
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiError("Publisher with name '" + publisher.getName() + "' already exists."));
            }
        } catch (IncorrectResultSizeDataAccessException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiError("IncorrectResultSizeDataAccessException"));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError(e.getMessage()));
        }
    }

    /**
     * Method to update an existing publisher
     *
     * @param id
     * @param publisher
     * @return ResponseEntity<Publisher>
     */
    @PutMapping("/{id}")
    public ResponseEntity<Object> updatePublisher(@PathVariable("id") long id, @RequestBody Publisher publisher) {
        Optional<Publisher> publisherData = publisherRepository.findById(id);

        if (publisherData.isPresent()) {
            Publisher _publisher = publisherData.get();
//            if (publisher.getName() != null) {
//                long idWithName = publisherService.publisherWithNameExists(publisher.getName());
//                if (idWithName == id || idWithName == -1) {
//                    _publisher.setName(publisher.getName());
//                } else {
//                    return ResponseEntity.status(409).build();
//                }
//            }

            // Add publisher to books
            if (publisher.getBooks() != null && !publisher.getBooks().isEmpty()) {
                if (publisher.getBooks().stream().allMatch(b -> bookService.bookExists(b.getId()))) {
                    bookService.removePublisherFromBooks(_publisher);
                    bookService.addPublisherToBooks(_publisher, publisher.getBooks());
//                    _publisher.setBooks(publisher.getBooks());
                } else {
                    return ResponseEntity.status(400).build();
                }
            }

//            _publisher = publisherRepository.findById(id).get();

            if (publisher.getName() != null) {
                long idWithName = publisherService.publisherWithNameExists(publisher.getName());
                if (idWithName == id || idWithName == -1) {
                    _publisher.setName(publisher.getName());
                } else {
                    return ResponseEntity.status(409).build();
                }
            }

            return new ResponseEntity<>(publisherRepository.save(_publisher), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Method to delete a publisher based on the publisher's id.
     *
     * @param id
     * @return ResponseEntity<Long>
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePublisher(@PathVariable("id") long id) {
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
