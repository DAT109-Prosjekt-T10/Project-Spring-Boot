package no.hvl.dat109.controller;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.entity.Book;
import no.hvl.dat109.entity.Publisher;
import no.hvl.dat109.repository.BookRepository;
import no.hvl.dat109.service.AuthorService;
import no.hvl.dat109.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorService authorService;

    @Autowired
    private PublisherService publisherService;

    @GetMapping("")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> allBooks = bookRepository.findAll();
        return new ResponseEntity<>(allBooks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable("id") long id) {

        Book book;
        try {
            book = bookRepository.findById(id).get();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(book);
    }

    @PostMapping("")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        System.out.println(book.toString());

        // If any author object only contains name create new author object
        // TODO Same name on author already exists?
        Set<Author> authors = book.getAuthors();
        if (authors != null) {
            authorService.createNewAuthorsIfNotExist(authors);
        }

        // If any publisher object only contains name create new publisher object
        Set<Publisher> publishers = book.getPublishers();
        if (publishers != null) {
            publisherService.createNewPublisherIfNotExist(publishers);
        }

        try {
            Book newBook = bookRepository.save(book);
            return ResponseEntity.status(HttpStatus.CREATED).body(newBook);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") long id, @RequestBody Book book) {
        Optional<Book> books = bookRepository.findById(id);

        if (books.isPresent()) {
            Book getBook = books.get();

            // TODO Finnes det en enklere løsning for å implementere denne funksjonaliteten?
            if (book.getTitle() != null) getBook.setTitle(book.getTitle());
            if (book.getIsbn() != null) getBook.setIsbn(book.getIsbn());
            if (book.getPublished() != null) getBook.setPublished(book.getPublished());
            if (book.getCategory() != null) getBook.setCategory(book.getCategory());
            if (book.getDescription() != null) getBook.setDescription(book.getDescription());

            if (book.getAuthors() != null && !book.getAuthors().isEmpty())
                getBook.setAuthors(authorService.findAuthorObjectsFromIds(book.getAuthors()));
            if (book.getPublishers() != null && !book.getPublishers().isEmpty())
                getBook.setPublishers(publisherService.findPublisherObjectsFromIds(book.getPublishers()));

            Book savedBook = bookRepository.save(getBook);

            return new ResponseEntity<>(savedBook, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteBook(@PathVariable("id") long id) {
        try {
            // TODO If there are orders on book in the future, do not delete
            bookRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}











