package no.hvl.dat109.entity;

import com.fasterxml.jackson.annotation.*;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id",
        scope = Publisher.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Entity
public class Publisher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(mappedBy = "publishers", cascade = {CascadeType.MERGE})
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Book> books = new HashSet<Book>();

    public Publisher() {
        super();
    }

    public Long getId() {
        return id;
    }

    public Publisher(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }

    @Override
    public String toString() {
        return "Publisher{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", books=" + books +
                '}';
    }
}
