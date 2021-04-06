package no.hvl.dat109.repository;

import no.hvl.dat109.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long>{

	@Query("SELECT a FROM Author a WHERE a.name = :name")
	Author findByName(String name);

	
}
