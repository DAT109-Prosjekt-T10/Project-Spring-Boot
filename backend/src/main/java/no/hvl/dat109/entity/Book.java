package no.hvl.dat109.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id",
        scope = Book.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
public class Book {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NaturalId
    @Column(name = "isbn", nullable = false, unique = true)
    private String isbn;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "description", nullable = true)
    private String description;
    
    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE })
    @JoinTable(
    		joinColumns = { @JoinColumn(name = "book_id") }, 
    		inverseJoinColumns = { @JoinColumn(name = "author_id") })
    @Column(name = "authors", nullable = false)
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Author> authors = new HashSet<Author>();
    
    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE })
    @JoinTable(
    		joinColumns = { @JoinColumn(name = "book_id") }, 
    		inverseJoinColumns = { @JoinColumn(name = "publisher_id") })
    @Column(name = "publishers", nullable = false)
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Publisher> publishers = new HashSet<Publisher>();

    @Column(name = "published", nullable = false)
    private LocalDate published;

    public Book() {
        super();
    }

    public Book(String isbn, String title, LocalDate published) {
        this.isbn = isbn;
        this.title = title;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getPublished() {
        return published;
    }

    public void setPublished(LocalDate published) {
        this.published = published;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Publisher> getPublishers() {
        return publishers;
    }

    public void setPublishers(Set<Publisher> publishers) {
        this.publishers = publishers;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", isbn='" + isbn + '\'' +
                ", title='" + title + '\'' +
                ", category='" + category + '\'' +
                ", description='" + description + '\'' +
                ", authors=" + authors +
                ", publishers=" + publishers +
                ", published=" + published +
                '}';
    }
}
