package no.hvl.dat109.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import no.hvl.dat109.entity.Book;
import no.hvl.dat109.repository.BookRepository;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping("")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> allBooks = bookRepository.findAll();

        // Fjerner authors array i JSON
        allBooks.forEach(book -> book.setAuthors(null));
        allBooks.forEach(book -> book.setPublishers(null));

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

        // Fjerner authors array i JSON
        book.setAuthors(null);
        book.setPublishers(null);

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
            if (book.getAuthors() != null) getBook.setAuthors(book.getAuthors());

            return new ResponseEntity<>(bookRepository.save(getBook), HttpStatus.OK);
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











