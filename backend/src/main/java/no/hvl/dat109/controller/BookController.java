package no.hvl.dat109.controller;

import java.time.LocalDate;
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
@RequestMapping(value = "/api/books", produces = "application/json")
public class BookController {

	@Autowired
	private BookRepository bookRepository;
	
	@GetMapping("")
	public ResponseEntity<List<Book>> getAllBooks() {
		List<Book> allBooks = bookRepository.findAll();

		if (allBooks.isEmpty()) {
			return new ResponseEntity<>(allBooks, HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(allBooks, HttpStatus.OK);
		}
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Book> getBook(@PathVariable("id") long id) {
		return bookRepository.findById(id)
						  .map(book -> new ResponseEntity<>(book, HttpStatus.OK))
						  .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// Endpoint?
	@GetMapping("/api/publisher/{id}")
	public ResponseEntity<List<Book>> getAllBooksByPublisherId(@PathVariable Long[] publisherIds) {
		List<Book> allBooksByPublisherId = new ArrayList<>();
		for (Long publisherId : publisherIds) {
			List<Book> booksByPublisherId = bookRepository.findByPublishers_Id(publisherId);
			if (!booksByPublisherId.isEmpty())
				allBooksByPublisherId.addAll(booksByPublisherId);
		}
		if (allBooksByPublisherId.isEmpty())
			return new ResponseEntity<>(allBooksByPublisherId, HttpStatus.NO_CONTENT);
		return new ResponseEntity<>(allBooksByPublisherId, HttpStatus.OK);
	}

//	@GetMapping("/{authorIds}")
//	public ResponseEntity<List<Book>> getAllBooksByAuthorId(@PathVariable Long[] authorIds) {
//		List<Book> allBooksByAuthorId = new ArrayList<>();
//		for (Long authorId : authorIds) {
//			List<Book> booksByAuthorId = bookRepository.findByAuthors_Id(authorId);
//			if (!booksByAuthorId.isEmpty())
//				allBooksByAuthorId.addAll(booksByAuthorId);
//		}
//		if (allBooksByAuthorId.isEmpty())
//			return new ResponseEntity<>(allBooksByAuthorId, HttpStatus.NO_CONTENT);
//
//		return new ResponseEntity<>(allBooksByAuthorId, HttpStatus.OK);
//	}

	
//	@PostMapping("")
//	public ResponseEntity<Book> createBook(ResponseEntity<Book> book) {
//
//		System.out.println(book.getBody().getIsbn());
////		return ResponseEntity.ok(book.getBody());
//
//		Book body = book.getBody();
//
//		String isbn = body.getIsbn();
//		System.out.println(isbn);
//		String name = body.getName();
//		LocalDate published = body.getPublished();
//
////		LocalDate publishedDate = null;
////
////		if (published != null) {
////			publishedDate = LocalDate.parse(published);
////		}
//
//		try {
//			Book newBook = bookRepository.save(new Book(isbn, name, published));
//
//			return ResponseEntity.status(HttpStatus.CREATED).body(newBook);
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.CONFLICT).build();
//		}
//	}

	@PostMapping("")
	public ResponseEntity<Book> createBook(@RequestBody Book book) {

//		book.getAuthors()
		// Legg til book hos author

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
	  public ResponseEntity<HttpStatus> deleteAuthor(@PathVariable("id") long id) {
	    try {
	    	bookRepository.deleteById(id);
	      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	
}











