package no.hvl.dat109.repository.tests.controller;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import no.hvl.dat109.controller.OrderController;
import no.hvl.dat109.repository.OrderRepository;

@RunWith(SpringRunner.class)
@WebMvcTest(OrderController.class)
public class OrderControllerIntegrationTest {

	@Autowired
	private MockMvc mvc;
	
	@Autowired
	private OrderRepository orderRepository;
	
}
