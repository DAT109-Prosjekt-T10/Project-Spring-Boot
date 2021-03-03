package no.hvl.dat109.models;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Book {
    
    private @Id @GeneratedValue Long id;
    private Long[] authors;
    private String isbn, name;
    private LocalDate published;

    public Book() {}

    public Book(String isbn, String name, Long[] authors, LocalDate published) {
        this.isbn = isbn;
        this.name = name;
        this.authors = authors;
        this.published = published;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long[] getAuthors() {
        return authors;
    }

    public void setAuthors(Long[] authors) {
        this.authors = authors;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getPublished() {
        return published;
    }

    public void setPublished(LocalDate published) {
        this.published = published;
    }

    @Override
    public boolean equals(Object o) {
        return true;
    }

    @Override
    public String toString() {
        return "";
    }
}
