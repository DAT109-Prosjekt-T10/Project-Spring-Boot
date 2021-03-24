package no.hvl.dat109.controller;

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
import org.springframework.web.bind.annotation.RestController;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.repository.AuthorRepository;

@RestController
@RequestMapping("/api/author")
public class AuthorController {

    @Autowired
    AuthorRepository authorRepository;

    /**
     * Method to fetch all authors.
     *
     * @return ResponseEntity<List < Author>>
     */
    @GetMapping("")
    public ResponseEntity<List<Author>> getAllAuthors() {
        List<Author> authors = authorRepository.findAll();

//        authors.forEach(a -> a.setBooks(null));

        return ResponseEntity.ok(authors);
    }

    /**
     * Method to fetch an author based on the authors id.
     *
     * @param id
     * @return ResponseEntity<Author>
     */
    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable("id") long id) {
        Optional<Author> authorData = authorRepository.findById(id);

        if (authorData.isPresent()) {
            Author author = authorData.get();
            return new ResponseEntity<>(author, HttpStatus.OK);
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
    @PostMapping("")
    public ResponseEntity<Author> createAuthor(@RequestBody Author author) {
        try {
            Author _author = authorRepository.save(author);
            return new ResponseEntity<>(_author, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
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
    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteAuthor(@PathVariable("id") long id) {
        try {
            authorRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
