package no.hvl.dat109.service.tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.entity.Book;
import no.hvl.dat109.entity.Publisher;
import no.hvl.dat109.repository.BookRepository;
import no.hvl.dat109.service.BookService;

@RunWith(MockitoJUnitRunner.class)
public class BookServiceTest {

	@Mock
	BookRepository bookRep;
	
	@InjectMocks
	BookService bookSer;
	
	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void bookExistByIdTest() {
		LocalDate date = LocalDate.of(2020, 1, 1);
		Book book = new Book("isbn", "title", date);
		book.setId(1L);
		Optional<Book> optbook = Optional.ofNullable(book);
		when(bookRep.findById(1L)).thenReturn(optbook);
		
		assertEquals(true, bookSer.bookExists(book.getId()));
	}
	
	@Test
	public void removeAuthorFromBooksTest() {
		LocalDate date = LocalDate.of(2020, 1, 1);
		Set<Book> bookSet = new HashSet<Book>();
		Book book = new Book("isbn", "title", date);
		bookSet.add(book);
		
		Author author = new Author();
		author.setId(1L);
		author.setBooks(bookSet);
		
		Author author2 = new Author();
		author2.setId(2L);
		author2.setBooks(bookSet);
		
		Set<Author> a = new HashSet<Author>();
		a.add(author);
		a.add(author2);
		book.setAuthors(a);
		
		//Sjekker at begge author legges til i Set a og Book book
		assertTrue(a.size() == 2);
		assertTrue(book.getAuthors().size() == 2);

		
		bookSer.removeAuthorFromBooks(author2);
		bookSer.removeAuthorFromBooks(author);
		
		//Sjekker at en author ble fjernet fra Set a og Book book
		assertTrue(a.isEmpty());
		assertTrue(book.getAuthors().isEmpty());
	}
	
	
	@Test
	public void removePublisherFromBooksTest() {
		LocalDate date = LocalDate.of(2020, 1, 1);
		Set<Book> bookSet = new HashSet<Book>();
		Book book = new Book("isbn", "title", date);
		bookSet.add(book);
		
		Publisher p = new Publisher();
		p.setName("publisher");
		p.setBooks(bookSet);
		
		Publisher p2 = new Publisher();
		p.setName("publisher2");
		p.setBooks(bookSet);
		
		Set<Publisher> pSet = new HashSet<Publisher>();
		pSet.add(p);
		pSet.add(p2);
		
		book.setPublishers(pSet);
		
		assertTrue(pSet.size() == 2);
		assertEquals(book.getPublishers().size(), 2);
		
		bookSer.removePublisherFromBooks(p);
		
		assertTrue(pSet.size() == 1);
		assertTrue(book.getPublishers().size() == 1);
		
	}
	
	@Test
	public void bookWithIsbnExistsTest() {
		LocalDate date = LocalDate.of(2020, 1, 1);
		Book book = new Book("111","title", date);
		
		when(bookRep.findByIsbn("111")).thenReturn(book);
		
		assertEquals(true, bookSer.bookWithIsbnExists(book.getIsbn()));
	}
	
	
	@Test
	public void addAuthorToBookTest() {
		LocalDate date = LocalDate.of(2020, 1, 1);
		Set<Book> bookSet = new HashSet<Book>();
		Optional<Book> bookopt = Optional.ofNullable(new Book("isbn", "title", date));
		
		Book book = bookopt.get();
		book.setId(1L);
		bookSet.add(book);
		
		when(bookRep.findById(1L)).thenReturn(bookopt);
		
		Author author = new Author();
		author.setId(1L);	
		author.setName("name");
		
		assertTrue(book.getAuthors().isEmpty());
		
		bookSer.addAuthorToBooks(author, bookSet);
		
		assertFalse(book.getAuthors().isEmpty());
		
	}
	
	
	@Test
	public void addPublisherToBookTest() {
		LocalDate date = LocalDate.of(2020, 1, 1);
		Set<Book> bookSet = new HashSet<Book>();
		Optional<Book> bookopt = Optional.ofNullable(new Book("isbn", "title", date));
		
		Book book = bookopt.get();
		book.setId(1L);
		bookSet.add(book);
		
		when(bookRep.findById(1L)).thenReturn(bookopt);
		
		Publisher p = new Publisher();
		p.setName("publisher");
		p.setBooks(bookSet);
		
		assertTrue(book.getPublishers().isEmpty());
		
		bookSer.addPublisherToBooks(p, bookSet);
		
		assertFalse(book.getPublishers().isEmpty());
		
		assertTrue(bookSet.stream().anyMatch(b -> book.getPublishers().equals(p.getName())));
		
	}
	
	
	
}
