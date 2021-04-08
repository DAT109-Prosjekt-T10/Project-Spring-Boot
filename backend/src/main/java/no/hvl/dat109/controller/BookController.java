package no.hvl.dat109.controller;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.entity.Book;
import no.hvl.dat109.entity.Publisher;
import no.hvl.dat109.repository.BookRepository;
import no.hvl.dat109.repository.OrderRepository;
import no.hvl.dat109.service.AuthorService;
import no.hvl.dat109.service.PublisherService;
import no.hvl.dat109.util.ApiError;

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
    private OrderRepository orderRepository;
    
    @Autowired
    private AuthorService authorService;

    @Autowired
    private PublisherService publisherService;

    @GetMapping("")
    public ResponseEntity<Object> getAllBooks() {
        List<Book> allBooks = bookRepository.findAll();
        return new ResponseEntity<>(allBooks, HttpStatus.OK);
    }

    /**
     * Method to fetch book by ID from database.
     * 
     * @param id
     * @return ResponseEntity<Book>
     */
    @GetMapping("/{id}")
    public ResponseEntity<Object> getBookById(@PathVariable("id") long id) {

        Book book;
        try {
            book = bookRepository.findById(id).get();
        } catch (Exception e) {
        	return ResponseEntity.status(404).body(new ApiError("Book does not exist on server."));
        }
        return ResponseEntity.ok(book);
    }

    /**
     * Method to create a new book and add to the database.
     * 
     * @param book
     * @return ResponseEntity<Book>
     */
    @PostMapping("")
    public ResponseEntity<Object> createBook(@RequestBody Book book) {
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
            return ResponseEntity.status(409).body(new ApiError("Book already exists on server."));
        }
    }

    /**
     * Method to update an existing book.
     * 
     * @param id
     * @param book
     * @return ResponseEntity<Book>
     */
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateBook(@PathVariable("id") long id, @RequestBody Book book) {
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
        	return ResponseEntity.status(404).body(new ApiError("Book does not exist on server."));
        }
    }

    /**
     * Method to delete a book from the database
     * 
     * @param id
     * @return ResponseEntity<Long>
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteBook(@PathVariable("id") long id) {
        try {
            // TODO If there are orders on book in the future, do not delete
        	
        	if (orderRepository.findAll() != null) {
        		return ResponseEntity.status(409).body(new ApiError("Book has existing orders."));
        	}
        	
            bookRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(new ApiError("Book does not exist on server."));
        }
    }

}











