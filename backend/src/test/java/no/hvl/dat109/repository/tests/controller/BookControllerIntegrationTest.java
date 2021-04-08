package no.hvl.dat109.repository.tests.controller;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import no.hvl.dat109.controller.BookController;
import no.hvl.dat109.repository.BookRepository;

@RunWith(SpringRunner.class)
@WebMvcTest(BookController.class)
public class BookControllerIntegrationTest {

	@Autowired
	private MockMvc mvc;
	
	@Autowired
	private BookRepository bookRepository;
}
