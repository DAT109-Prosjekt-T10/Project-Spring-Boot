package no.hvl.dat109.entity;

import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import org.hibernate.annotations.NaturalId;

@Entity
public class Book {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NaturalId
    @Column(name = "isbn", nullable = false, unique = true)
    private String isbn;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @ManyToMany
    @JoinTable(joinColumns = { @JoinColumn(name = "book_id") }, inverseJoinColumns = {
    		@JoinColumn(name = "author_id") })
    private Set<Author> authors;
    
    @ManyToMany
    @JoinTable(joinColumns = { @JoinColumn(name = "book_id") }, inverseJoinColumns = {
    		@JoinColumn(name = "publisher_id") })
    private Set<Publisher> publishers;
    
    private LocalDate published;

    public Book() {
        super();
    }

    public Book(String isbn, String name, LocalDate published) {
        this.isbn = isbn;
        this.name = name;
        this.published = published;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Author> author) {
        this.authors = author;
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
		return "Book [id=" + id + ", author=" + authors + ", isbn=" + isbn + ", name=" + name + ", published="
				+ published + "]";
	}

}
