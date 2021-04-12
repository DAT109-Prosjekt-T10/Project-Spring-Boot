package no.hvl.dat109.service;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.entity.Book;
import no.hvl.dat109.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    public boolean authorExists(Long id) {
        return authorRepository.findById(id).isPresent();
    }

    public long authorWithNameExists(String name) {
        Author author = authorRepository.findByName(name);
        System.out.println("jkjhk");
        if (author != null) {
            return author.getId();
        } else {
            return -1;
        }
    }

    public Author atLeastOneAuthorWithNameExist(Book book) {
        return book.getAuthors().stream()
                .filter(a -> a.getName() != null)
                .filter(a -> authorWithNameExists(a.getName()) != -1)
                .findAny()
                .orElse(null);
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

    public Set<Author> findAuthorObjectsFromIds(Set<Author> authors) {
        createNewAuthorsIfNotExist(authors);
        authors = authors.stream().map(a -> {
            Optional<Author> optionalAuthor = authorRepository.findById(a.getId());
            return optionalAuthor.orElseGet(() -> authorRepository.save(a));
        }).collect(Collectors.toSet());

        return authors;
    }

}
