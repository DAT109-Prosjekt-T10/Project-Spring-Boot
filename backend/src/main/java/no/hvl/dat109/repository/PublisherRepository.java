package no.hvl.dat109.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import no.hvl.dat109.entity.Publisher;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long>{

    @Query("SELECT p FROM Publisher p WHERE p.name = :name")
    Publisher findByName(String name);


}
