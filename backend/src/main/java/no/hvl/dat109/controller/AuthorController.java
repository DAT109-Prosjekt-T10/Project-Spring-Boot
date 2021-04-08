package no.hvl.dat109.controller;

import java.util.List;
import java.util.Optional;

import no.hvl.dat109.service.AuthorService;
import no.hvl.dat109.service.BookService;
import no.hvl.dat109.util.ApiError;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.repository.AuthorRepository;

@RestController
@RequestMapping("/api/author")
public class AuthorController {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookService bookService;


    @Autowired
    private AuthorService authorService;

    /**
     * Method to fetch all authors.
     *
     * @return ResponseEntity<List < Author>>
     */
    @GetMapping("")
    public ResponseEntity<Object> getAllAuthors() {
        List<Author> authors = authorRepository.findAll();
        return ResponseEntity.ok(authors);
    }

    /**
     * Method to fetch an author based on the authors id.
     *
     * @param id
     * @return ResponseEntity<Author>
     */
    @GetMapping("/{id}")
    public ResponseEntity<Object> getAuthorById(@PathVariable("id") long id) {
        Optional<Author> authorData = authorRepository.findById(id);

        if (authorData.isPresent()) {
            Author author = authorData.get();
            return new ResponseEntity<>(author, HttpStatus.OK);
        } else {
        	return ResponseEntity.status(404).body(new ApiError("Author does not exist on server."));
        }
    }

    /**
     * Method to create a new author.
     *
     * @param author
     * @return ResponseEntity<Author>
     */
    @PostMapping("")
    public ResponseEntity<Object> createAuthor(@RequestBody Author author) {
        try {
            if (authorService.authorWithNameExists(author.getName()) == -1) {
                Author savedAuthor = authorRepository.save(author);
                return ResponseEntity.ok(savedAuthor);
            } else {
            	return ResponseEntity.status(409).body(new ApiError("Author already exists on server."));
            }
        } catch (IncorrectResultSizeDataAccessException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    /**
     * Method to update an existing author
     *
     * @param id
     * @param author
     * @return ResponseEntity<Author>
     */
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateAuthor(@PathVariable("id") long id, @RequestBody Author author) {
        Optional<Author> fetchedAuthor = authorRepository.findById(id);

        if (fetchedAuthor.isPresent()) {
            Author _author = fetchedAuthor.get();


            // Add author to books
            if (author.getBooks() != null && !author.getBooks().isEmpty()) {
                if (author.getBooks().stream().allMatch(b -> bookService.bookExists(b.getId()))) {
                    bookService.removeAuthorFromBooks(_author);
                    bookService.addAuthorToBooks(_author, author.getBooks());
//                    _author.setBooks(author.getBooks());
                } else {
                    return ResponseEntity.status(400).build();
                }
            }

//            _author = authorRepository.findById(id).get();

            if (author.getName() != null) {
                // Check if name already exists
                long idWithName = authorService.authorWithNameExists(author.getName());
                System.out.println(idWithName);
                if (idWithName == id || idWithName == -1) {
                    _author.setName(author.getName());
                } else {
                    return ResponseEntity.status(409).build();
                }
            }
            authorRepository.save(_author);
            return new ResponseEntity<>(authorRepository.findById(id).get(), HttpStatus.OK);
        } else {
        	return ResponseEntity.status(404).body(new ApiError("Author does not exist on server."));
        }
    }

    /**
     * Method to delete an author based on the author's id.
     *
     * @param id
     * @return ResponseEntity<HttpStatus>
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteAuthor(@PathVariable("id") long id) {
        try {
            Author author = authorRepository.findById(id).get();
            bookService.removeAuthorFromBooks(author);
            authorRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } catch (Exception e) {
        	return ResponseEntity.status(404).body(new ApiError("Author does not exist on server."));
        }
    }


}
