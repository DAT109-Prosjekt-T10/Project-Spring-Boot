package no.hvl.dat109.service;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.entity.Book;
import no.hvl.dat109.entity.Publisher;
import no.hvl.dat109.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

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


//    public Set<Book> createNewBookIfNotExist(Author author, Set<Book> books) {
////        for (Book b : books) {
////            if (b.getId() == null || !bookRepository.existsById(b.getId())) {
////                Book savedBook = bookRepository.save(b);
////                System.out.println("Created new book " + savedBook);
////            }
////        }
//        if (books.stream().allMatch(this::bookContainsAllAttributes)) {
//            return books.stream().map(b -> {
//                if (b.getId() != null) {
//                    Optional<Book> optionalBook = bookRepository.findById(b.getId());
//                    return optionalBook.orElseGet(() -> bookRepository.save(b));
//                }
//                assignAuthorBook(author, b);
//                return bookRepository.save(b);
//            }).collect(Collectors.toSet());
//        }
//        return null;
//    }

//    public boolean allBooksExist(Set<Book> books) {
//        return books.stream().allMatch(b -> bookExists(b.getId()));
//    }
//
//    public void connectBookAuthorEntities(Author a, Set<Book> books) {
//        books.forEach(b -> {
//            if (bookExists(b.getId())) {
//                assignAuthorBook(a, b);
//            }
//        });
//    }

//    public Set<Book> addAuthorToBooks(Author a, Set<Book> books) {
//        List<Book> bookList = new ArrayList<>(books);
//        for (int i = 0; i < bookList.size() - 1; i++) {
//            if (bookList.get(i).getId() != null) {
//                Optional<Book> optionalBook = bookRepository.findById(bookList.get(i).getId());
//                if (optionalBook.isEmpty()) {
//                    return null;
//                }
//                Book getBook = optionalBook.get();
//                Set<Author> authors = getBook.getAuthors();
//                authors.add(a);
//                getBook.setAuthors(authors);
//                bookList.set(i, bookRepository.save(getBook));
//            } else {
//                return null;
//            }
//        }
//        return new HashSet<>(bookList);
//    }

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


}
