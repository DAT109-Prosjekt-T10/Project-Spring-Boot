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

import no.hvl.dat109.entity.Publisher;
import no.hvl.dat109.repository.PublisherRepository;

@RestController
@RequestMapping("/api/publisher")
public class PublisherController {
    
	@Autowired
	PublisherRepository publisherRepository;
	
	
	@GetMapping("/api/publisher")
	  public ResponseEntity<List<Publisher>> getAllAuthors(@RequestParam(required = false) String author) {
	    try {
	      List<Publisher> publisherList = new ArrayList<Publisher>();

	      publisherRepository.findAll().forEach(publisherList::add);

	      if (publisherList.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }

	      return new ResponseEntity<>(publisherList, HttpStatus.OK);
	      
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	
	
	@GetMapping("/api/publisher/{id}")
	  public ResponseEntity<Publisher> getAuthorById(@PathVariable("id") long id) {
	    Optional<Publisher> publisherData = publisherRepository.findById(id);

	    if (publisherData.isPresent()) {
	      return new ResponseEntity<>(publisherData.get(), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }
	
	@PostMapping("/api/publisher")
	  public ResponseEntity<Publisher> createAuthor(WebRequest req) {
	    try {
	    	
	    	String name = req.getParameter("name");
	    
	    	Publisher publisher = publisherRepository.save(new Publisher(name));
	      
	    	return new ResponseEntity<>(publisher, HttpStatus.CREATED);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	

	 @PutMapping("/api/publisher/{id}")
	  public ResponseEntity<Publisher> updateAuthor(@PathVariable("id") long id, @RequestBody Publisher publisher) {
	    Optional<Publisher> publisherData = publisherRepository.findById(id);

	    if (publisherData.isPresent()) {
	      Publisher _publisher = publisherData.get();
	      	      
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
	 @DeleteMapping("/api/publisher/{id}")
	  public ResponseEntity<HttpStatus> deleteAuthor(@PathVariable("id") long id) {
	    try {
	      publisherRepository.deleteById(id);
	      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	
}
