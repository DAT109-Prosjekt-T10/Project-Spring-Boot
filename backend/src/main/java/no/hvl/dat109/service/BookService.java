package no.hvl.dat109.service;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.entity.Book;
import no.hvl.dat109.entity.Order;
import no.hvl.dat109.entity.Publisher;
import no.hvl.dat109.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private OrderService orderService;

    public boolean bookExists(Long id) {
        return bookRepository.findById(id).isPresent();
    }

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

    public boolean bookWithIsbnExists(String isbn) {
        Book book = bookRepository.findByIsbn(isbn);
        return book != null;
    }

    public void removeAllOrdersForBook(long id) {
        Optional<Book> bookOptional = bookRepository.findById(id);
        if (bookOptional.isPresent()) {
            for (Order o : bookOptional.get().getBookOrders()) {
                orderService.removeOrder(o.getId());
            }
        }
    }

    public boolean addAuthorToBooks(Author a, Set<Book> books) {
        for (Book b : books) {
            if (b.getId() != null) {
                Optional<Book> optionalBook = bookRepository.findById(b.getId());
                if (optionalBook.isEmpty()) {
                    return false;
                }
                Book getBook = optionalBook.get();
                Set<Author> authors = getBook.getAuthors();
                authors.add(a);
                getBook.setAuthors(authors);
                bookRepository.save(getBook);
            } else {
                return false;
            }
        }
        return true;
    }

    public boolean addPublisherToBooks(Publisher p, Set<Book> books) {
        for (Book b : books) {
            if (b.getId() != null) {
                Optional<Book> optionalBook = bookRepository.findById(b.getId());
                if (optionalBook.isEmpty()) {
                    return false;
                }
                Book getBook = optionalBook.get();
                Set<Publisher> publishers = getBook.getPublishers();
                publishers.add(p);
                getBook.setPublishers(publishers);
                bookRepository.save(getBook);
            } else {
                return false;
            }
        }
        return true;
    }

    public boolean bookContainsAllAttributes(Book book) {
        return book.getIsbn() != null && book.getTitle() != null
                && book.getCategory() != null && book.getPublishers() != null
                && book.getPublished() != null;
    }

    public boolean bookIsAvailable(Long id, LocalDate dateFrom, LocalDate dateTo) {

        // Check if date is before today
        if (dateFrom.isBefore(LocalDate.now())) {
            return false;
        }

        // Check if end date is before start date
        if (dateTo.isBefore(dateFrom)) {
            return false;
        }

        Optional<Book> bookOptional = bookRepository.findById(id);
        if (bookOptional.isPresent()) {

            Book book = bookOptional.get();
            Set<Order> orders = book.getBookOrders();

            for (Order o : orders) {

                // Order starting on start or end date of another order
                if (dateFrom.isEqual(o.getDateFrom()) || dateFrom.isEqual(o.getDateTo()) || dateTo.isEqual(o.getDateFrom()) || dateTo.isEqual(o.getDateTo())) {
                    return false;
                }

                if (dateFrom.isBefore(o.getDateTo()) && o.getDateFrom().isBefore(dateTo)) {
                    return false;
                }

            }

        }

        return true;

    }

    public boolean futureBookReservations(long bookId) {

        Optional<Book> bookOptional = bookRepository.findById(bookId);

        if (bookOptional.isPresent()) {

            Set<Order> orders = bookOptional.get().getBookOrders();
            return orders.stream()
                    .anyMatch(o -> o.getDateFrom().isAfter(LocalDate.now()) || o.getDateTo().isAfter(LocalDate.now()));

        }

        return false;

    }


}
