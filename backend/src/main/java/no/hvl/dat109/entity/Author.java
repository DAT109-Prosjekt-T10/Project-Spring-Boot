package no.hvl.dat109.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Author {
    
	@Id
	@GeneratedValue
	private Long id;
	
	private String name;
	
	@ManyToMany
	private List<Book> books;
	
	public Author(String name) {
		this.name = name;
		this.books = new ArrayList<Book>();
	}
	
	public Author(String name, List<Book> books) {
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

	public List<Book> getBooks() {
		return books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}

	@Override
	public String toString() {
		return "Author [id=" + id + ", name=" + name + ", books=" + books + "]";
	}
	
}
