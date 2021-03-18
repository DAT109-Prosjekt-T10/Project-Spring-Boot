package no.hvl.dat109.controller;

import java.util.ArrayList;
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

            getBook.setName(book.getName());
            getBook.setIsbn(book.getIsbn());
            getBook.setPublished(book.getPublished());

            return new ResponseEntity<>(bookRepository.save(getBook), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable("id") long id) {
        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent()) {
            bookRepository.deleteById(id);
            return ResponseEntity.ok(book.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}











