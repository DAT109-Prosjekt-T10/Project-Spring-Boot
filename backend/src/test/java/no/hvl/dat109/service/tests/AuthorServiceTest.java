package no.hvl.dat109.service.tests;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import no.hvl.dat109.entity.Author;
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
	public void authorWithNameExistsTest() {
		Author test = new Author("H.C. Andersen");
		test.setId((long) 1);
		
		when(repository.findByName("H.C. Andersen")).thenReturn(test);
		assertEquals("", 1, service.authorWithNameExists("H.C. Andersen"));
	}
}
