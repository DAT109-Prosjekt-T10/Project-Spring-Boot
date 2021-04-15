package no.hvl.dat109.service.tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.ArgumentMatchers.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.entity.Book;
import no.hvl.dat109.repository.AuthorRepository;
import no.hvl.dat109.service.AuthorService;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class AuthorServiceTest {

	@Autowired
	private AuthorService service;

	@MockBean
	private AuthorRepository repository;

	@Test
	public void authorExistsTest() {
		Author temp = new Author("H.C. Andersen");
		temp.setId((long) 256);
		Optional<Author> test = Optional.of(temp);

		when(repository.findById((long) 256)).thenReturn(test);
		assertTrue("", service.authorExists((long) 256));
	}

	@Test
	public void authorWithNameExistsTest() {
		Author test = new Author("H.C. Andersen");
		test.setId((long) 1);

		when(repository.findByName("H.C. Andersen")).thenReturn(test);
		assertEquals("", 1, service.authorWithNameExists("H.C. Andersen"));
	}

	@Test
	public void atLeastOneAuthorWithNameExistsTest() {

		Set<Author> authors = new HashSet<Author>();

		Author a1 = new Author();
		Author a2 = new Author();
		Author a3 = new Author();

		a1.setId((long) 111);
		a2.setId((long) 222);
		a3.setId((long) 333);

		a2.setName("Roald Dahl");

		authors.add(a1);
		authors.add(a2);
		authors.add(a3);

		Book book = new Book("555", "BFG", LocalDate.now());

		book.setAuthors(authors);

		Author test = new Author();
		test.setId((long) 987);
		test.setName("Roald Dahl");

		when(repository.findByName("Roald Dahl")).thenReturn(test);

		assertTrue("", service.atLeastOneAuthorWithNameExist(book).getName().equals("Roald Dahl"));
	}

	@Test
	public void createNewAuthorsIfNotExistTest() {
		
		Set<Author> authors = new HashSet<Author>();

		Author a1 = new Author();
		Author a2 = new Author();
		Author a3 = new Author();

		a1.setId((long) 111);
		a2.setId((long) 222);
		
		a1.setName("H.C. Andersen");
		a2.setName("Roald Dahl");
		a3.setName("Henrik Ibsen");

		authors.add(a1);
		authors.add(a2);
		authors.add(a3);
		
		Author test = new Author();
		test.setName("Henrik Ibsen");
		
		doAnswer(invocation -> {
			test.setId((long) 333);
			return invocation.getArgument(0);
		}).when(repository).save(a3);
		
		service.createNewAuthorsIfNotExist(authors);
		
		assertTrue("", test.getId() == 333);
	}

}
