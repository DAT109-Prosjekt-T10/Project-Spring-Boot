package no.hvl.dat109.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import no.hvl.dat109.entity.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long>{

	
	
}
