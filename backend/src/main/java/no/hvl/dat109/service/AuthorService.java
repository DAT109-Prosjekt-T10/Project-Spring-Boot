package no.hvl.dat109.service;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    public boolean authorExists(Long id) {
        return authorRepository.findById(id).isPresent();
    }

    public boolean atLeastOneAuthorNotExists(Set<Author> authors) {
        return authors.stream().anyMatch(a -> !authorExists(a.getId()));
    }

    public void createNewAuthorsIfNotExist(Set<Author> authors) {

        for (Author a : authors) {
            if (a.getId() == null) {
                if (a.getName() != null) {
                    Author savedAuthor = authorRepository.save(a);
                    System.out.println("Created new author " + savedAuthor);
                }
            }
        }

    }

}
