package no.hvl.dat109.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import no.hvl.dat109.entity.Book;
import no.hvl.dat109.repository.BookRepository;

@RestController
@RequestMapping(value="/books", produces = "application/json")
public class BookController {
	
	private BookRepository bookRepository;
	
	@GetMapping("/api/books")
	public ResponseEntity<List<Book>> getAllBooks() {
		List<Book> allBooks = bookRepository.findAll();
		
		if(allBooks == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else if (allBooks.isEmpty()) {
			return new ResponseEntity<>(allBooks, HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(allBooks, HttpStatus.OK);
		}
		
	}
	
	@GetMapping("/api/books/{id}")
	public ResponseEntity<Book> getBook(@PathVariable Long id) {
		return bookRepository.findById(id)
						  .map(book -> new ResponseEntity<>(book, HttpStatus.OK))
						  .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@GetMapping("/api/publisher/{id}")
	public ResponseEntity<List<Book>> getAllBooksByPublisherId(@PathVariable Long[] publisherIds) {
		List<Book> allBooksByPublisherId = new ArrayList<>();
		for (Long publisherId : publisherIds) {
			List<Book> booksByPublisherId = bookRepository.findByPublisherId(publisherId);
			if (!booksByPublisherId.isEmpty())
				allBooksByPublisherId.addAll(booksByPublisherId);
		}
		if (allBooksByPublisherId.isEmpty())
			return new ResponseEntity<>(allBooksByPublisherId, HttpStatus.NO_CONTENT);
		return new ResponseEntity<>(allBooksByPublisherId, HttpStatus.OK);
	}

	@GetMapping("/by-author-id/{authorIds}")
	public ResponseEntity<List<Book>> getAllBooksByAuthorId(@PathVariable Long[] authorIds) {
		List<Book> allBooksByAuthorId = new ArrayList<>();
		for (Long authorId : authorIds) {
			List<Book> booksByAuthorId = bookRepository.findByAuthorsId(authorId);
			if (!booksByAuthorId.isEmpty())
				allBooksByAuthorId.addAll(booksByAuthorId);
		}
		if (allBooksByAuthorId.isEmpty())
			return new ResponseEntity<>(allBooksByAuthorId, HttpStatus.NO_CONTENT);

		return new ResponseEntity<>(allBooksByAuthorId, HttpStatus.OK);
	}

	
	@PostMapping("/api/books")
	public ResponseEntity<Book> createBook(@RequestBody Book book) {
		try {
			Book newBook = bookRepository.save(new Book(book.getIsbn(), book.getName(), book.getPublished()));

			return new ResponseEntity<>(newBook, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
    @PutMapping("/api/books/{id}")
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

    @DeleteMapping("/api/books/{id}")
	  public ResponseEntity<HttpStatus> deleteAuthor(@PathVariable("id") long id) {
	    try {
	    	bookRepository.deleteById(id);
	      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	
}











