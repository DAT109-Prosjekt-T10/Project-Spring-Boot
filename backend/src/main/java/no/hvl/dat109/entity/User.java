package no.hvl.dat109.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.NaturalId;

@Entity
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @NaturalId
    private String email;
    private String name;
    private String hashedPassword;

    public User(String email, String name, String hashedPassword) {
        this.email = email;
        this.name = name;
        this.hashedPassword = hashedPassword;
    }

    public User() {
        super();
    }

    @Override
    public String toString() {
        return "User: " + name + "\n Email: " + email + "\n Hashed Password: " + hashedPassword;
    }
}
