package no.hvl.dat109.repository.tests;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.*;
import static org.junit.Assert.assertEquals;

import javax.sql.DataSource;

import no.hvl.dat109.dao.UserDAO;
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
    public void shouldFindAllUsers() {
        DataSource dataSource = new EmbeddedDatabaseBuilder().setType(EmbeddedDatabaseType.H2)
        		.addScript("classpath:schema-h2.sql")
        		.addScript("classpath:data-h2.sql")
        		.build();
        
        UserDAO userDAO = new UserDAO();
        
        userDAO.setDataSource(dataSource);
        
        assertEquals(3, userDAO.getCountOfUsers());
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
