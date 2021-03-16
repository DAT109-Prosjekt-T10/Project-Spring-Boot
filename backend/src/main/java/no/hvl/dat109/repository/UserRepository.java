package no.hvl.dat109.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import no.hvl.dat109.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    User findByEmail(String email);

}
