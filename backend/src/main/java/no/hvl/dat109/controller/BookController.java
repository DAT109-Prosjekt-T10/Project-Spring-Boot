package no.hvl.dat109.controller;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.entity.Book;
import no.hvl.dat109.repository.BookRepository;
import no.hvl.dat109.service.AuthorService;
import no.hvl.dat109.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.SecondaryTable;
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

        // Fjerner authors array i JSON
//        allBooks.forEach(book -> book.setAuthors(null));
//        allBooks.forEach(book -> book.setPublishers(null));

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

//        for (Author a : book.getAuthors()) {
//            a.setBooks(null);
//        }

//        for (Publisher a : book.getPublishers()) {
//            a.setBooks(null);
//        }

        // Fjerner authors array i JSON
//        book.setAuthors(null);
//        book.setPublishers(null);

        return ResponseEntity.ok(book);
    }

    // Endpoint?
//    @GetMapping("/api/publisher/{id}")
//    public ResponseEntity<List<Book>> getAllBooksByPublisherId(@PathVariable Long[] publisherIds) {
//        List<Book> allBooksByPublisherId = new ArrayList<>();
//        for (Long publisherId : publisherIds) {
//            List<Book> booksByPublisherId = bookRepository.findByPublishers_Id(publisherId);
//            if (!booksByPublisherId.isEmpty())
//                allBooksByPublisherId.addAll(booksByPublisherId);
//        }
//        if (allBooksByPublisherId.isEmpty())
//            return new ResponseEntity<>(allBooksByPublisherId, HttpStatus.NO_CONTENT);
//        return new ResponseEntity<>(allBooksByPublisherId, HttpStatus.OK);
//    }

    @PostMapping("")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        System.out.println(book.toString());

        // If any author object only contains name create new author object
        Set<Author> authors = book.getAuthors();
        if (authors != null) {
                authorService.createNewAuthorsIfNotExist(authors);
        }

        // Check that all authors and all publishers exist. Else: return 400 bad request
//        if (authorService.atLeastOneAuthorNotExists(book.getAuthors()) ||
//                publisherService.atLeastOnePublisherNotExists(book.getPublishers())) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
//        }

        try {
            Book newBook = bookRepository.save(book);
            return ResponseEntity.status(HttpStatus.CREATED).body(newBook);
        } catch (Exception e) {
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

            // TODO find authors/publishers by id and add to object to be able to edit authors/publishers for a book

//            System.out.println(book.getAuthors() + " " + book.getAuthors().isEmpty());
//            System.out.println(book.getPublishers() + " " + book.getPublishers().isEmpty());
//
//            if (book.getAuthors() != null && !book.getAuthors().isEmpty()) getBook.setAuthors(book.getAuthors());
//            if (book.getPublishers() != null && !book.getPublishers().isEmpty()) getBook.setPublishers(book.getPublishers());

            Book savedBook = bookRepository.save(getBook);

            // Fjerner authors og publishers array i JSON response
            savedBook.setAuthors(null);
            savedBook.setPublishers(null);

            return new ResponseEntity<>(savedBook, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteBook(@PathVariable("id") long id) {
//        Optional<Book> book = bookRepository.findById(id);
//        if (book.isPresent()) {
//            bookRepository.deleteById(id);
//            return ResponseEntity.ok(book.get());
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
        try {
            bookRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}











