package no.hvl.dat109.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import no.hvl.dat109.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

	Book findByNameAllIgnoreCase(String name);

    List<Book> findByPublisherId(Long id);

    List<Book> findByAuthorsId(Long id);

    @Query("SELECT b " +
            "FROM Book b " +
            "JOIN FETCH b.authors " +
            "jOIN FETCH b.publisher")
    List<Book> findAll();
	
	
}
