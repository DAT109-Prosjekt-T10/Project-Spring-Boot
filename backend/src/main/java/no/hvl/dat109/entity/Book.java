package no.hvl.dat109.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.NaturalId;

@Entity
public class Book {
    
    @Id 
    @GeneratedValue
    private Long id;
    
    private List<Long> author;
    
    @NaturalId
    private String isbn;
    private String name;
    private LocalDate published;

    public Book() {
        super();
    }

    public Book(String isbn, String name, List<Long> author, LocalDate published) {
        this.isbn = isbn;
        this.name = name;
        this.author = author;
        this.published = published;
    }
    
    public Book(String isbn, String name, LocalDate published) {
    	this.isbn = isbn;
    	this.name = name;
    	this.author = new ArrayList<Long>();
    	this.published = published;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Long> getAuthors() {
        return author;
    }

    public void setAuthors(List<Long> author) {
        this.author = author;
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
	public String toString() {
		return "Book [id=" + id + ", author=" + author + ", isbn=" + isbn + ", name=" + name + ", published="
				+ published + "]";
	}

}
