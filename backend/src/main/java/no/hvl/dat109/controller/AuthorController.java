package no.hvl.dat109.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import org.springframework.web.context.request.WebRequest;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.repository.AuthorRepository;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {
	
	@Autowired
	AuthorRepository authorRepository;
	
	/**
	 * Method to fetch all authors.
	 * 
	 * @param author
	 * @return ResponseEntity<List<Author>>
	 */
	@GetMapping("/api/authors")
	  public ResponseEntity<List<Author>> getAllAuthors(@RequestParam(required = false) String author) {
	    try {
	      List<Author> authorsList = new ArrayList<Author>();

	      authorRepository.findAll().forEach(authorsList::add);

	      if (authorsList.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }

	      return new ResponseEntity<>(authorsList, HttpStatus.OK);
	      
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	
	/**
	 * Method to fetch an author based on the authors id.
	 * 
	 * @param id
	 * @return ResponseEntity<Author>
	 */
	@GetMapping("/api/authors/{id}")
	  public ResponseEntity<Author> getAuthorById(@PathVariable("id") long id) {
	    Optional<Author> tutorialData = authorRepository.findById(id);

	    if (tutorialData.isPresent()) {
	      return new ResponseEntity<>(tutorialData.get(), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }
	
	/**
	 * Method to create a new author.
	 * 
	 * @param author
	 * @return ResponseEntity<Author>
	 */
	@PostMapping("/api/authors")
	  public ResponseEntity<Author> createAuthor(WebRequest req) {
	    try {
	    	
	    	String name = req.getParameter("name");
	    
	    	Author _author = authorRepository.save(new Author(name));
	      
	    	return new ResponseEntity<>(_author, HttpStatus.CREATED);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	
	 /**
	  * Method to update an existing author
	  * 
	  * @param id
	  * @param author
	  * @return ResponseEntity<Author>
	  */
	 @PutMapping("/api/authors/{id}")
	  public ResponseEntity<Author> updateAuthor(@PathVariable("id") long id, @RequestBody Author author) {
	    Optional<Author> tutorialData = authorRepository.findById(id);

	    if (tutorialData.isPresent()) {
	      Author _author = tutorialData.get();
	      
	      _author.setName(author.getName());
	      _author.setBooks(author.getBooks());
	      
	      return new ResponseEntity<>(authorRepository.save(_author), HttpStatus.OK);
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
	 @DeleteMapping("/api/authors/{id}")
	  public ResponseEntity<HttpStatus> deleteAuthor(@PathVariable("id") long id) {
	    try {
	      authorRepository.deleteById(id);
	      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	
	
}
