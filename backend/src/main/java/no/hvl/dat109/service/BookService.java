package no.hvl.dat109.service;

import no.hvl.dat109.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
   
	@Autowired
	private BookRepository bookRepository;

}
