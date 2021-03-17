package no.hvl.dat109.dao;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;

public class UserDAO {

	private JdbcTemplate jdbcTemplate;
	
	public void setDataSource(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	public int getCountOfUsers() {
		return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users", Integer.class);
	}
	
}
