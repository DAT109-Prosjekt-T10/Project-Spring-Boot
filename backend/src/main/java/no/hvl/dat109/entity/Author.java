package no.hvl.dat109.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table
public class Author {
    
	@Id
	@SequenceGenerator(name = "author_sequence", sequenceName = "author_sequence", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "author_sequence")
	private Long id;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "authors")
	private Set<Book> books;
	
	public Author() {
		super();
	}
	
	public Author(String name) {
		this.name = name;
		this.books = new HashSet<Book>();
	}
	
	public Author(String name, Set<Book> books) {
		this.name = name;
		this.books = books;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
		return "Author [id=" + id + ", name=" + name + ", books=" + books + "]";
	}
	
}
