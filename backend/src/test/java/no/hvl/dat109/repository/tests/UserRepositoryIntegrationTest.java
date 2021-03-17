package no.hvl.dat109.repository.tests;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.*;

import no.hvl.dat109.entity.User;
import no.hvl.dat109.repository.UserRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryIntegrationTest {

	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private UserRepository ur;
		
	@Test
    public void testExample() throws Exception {
        this.entityManager.persist(new User("sboot", "sboot@gmail.com","1234"));
        User user = this.ur.findByEmail("sboot@gmail.com");
        assertThat(user.getEmail()).isEqualTo("sboot@gmail.com");
        assertThat(user.getName()).isEqualTo("sboot");
    }
	
	@Test
	public void whenFindByEmail_thenReturnUser() throws Exception {
		User simen = new User("simen", "simen@gmail.com", "simen123", false);
		entityManager.persist(simen);
		entityManager.flush();
		
		User found = ur.findByEmail(simen.getEmail());
		
		assertThat(found.getEmail()).isEqualTo(simen.getEmail());		
		
	}
	
}
