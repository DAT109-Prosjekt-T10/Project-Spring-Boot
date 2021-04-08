package no.hvl.dat109.repository.tests.controller;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import no.hvl.dat109.controller.UserController;
import no.hvl.dat109.repository.UserRepository;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerIntegrationTest {

	@Autowired
	private MockMvc mvc;
	
	@Autowired
	private UserRepository userRepository;
	
}
