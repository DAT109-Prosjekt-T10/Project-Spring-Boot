package no.hvl.dat109.repository;

import java.util.List;

import no.hvl.dat109.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import no.hvl.dat109.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
	
    List<Book> findByPublishers_Id(Long id);

    List<Book> findByAuthors_Id(Long id);

    @Query("SELECT b FROM Book b WHERE b.isbn = :isbn")
    Book findByIsbn(String isbn);
	
    @Query("SELECT b from Book b WHERE b.title LIKE %?1% OR b.isbn LIKE %?1%")
	public List<Book> search(String keyword);
}
