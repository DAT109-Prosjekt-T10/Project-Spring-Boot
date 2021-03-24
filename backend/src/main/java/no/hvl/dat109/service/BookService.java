package no.hvl.dat109.service;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.entity.Book;
import no.hvl.dat109.entity.Publisher;
import no.hvl.dat109.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public void removeAuthorFromBooks(Author a) {
        for (Book b : a.getBooks()) {
            b.getAuthors().remove(a);
            bookRepository.save(b);
        }
    }

    public void removePublisherFromBooks(Publisher p) {
        for (Book b : p.getBooks()) {
            b.getPublishers().remove(p);
            bookRepository.save(b);
        }
    }

}
