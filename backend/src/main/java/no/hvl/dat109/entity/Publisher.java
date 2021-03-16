package no.hvl.dat109.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Publisher {
    
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	@ManyToMany(mappedBy = "publishers")
	private Set<Long> books = new HashSet<Long>();
	
	public Publisher() {
		super();
	}
	
	public Publisher(String name) {
		this.name = name;
	}
}
