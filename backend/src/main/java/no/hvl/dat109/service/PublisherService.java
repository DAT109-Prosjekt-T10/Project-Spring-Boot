package no.hvl.dat109.service;

import no.hvl.dat109.entity.Publisher;
import no.hvl.dat109.repository.BookRepository;
import no.hvl.dat109.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PublisherService {

    @Autowired
    private PublisherRepository publisherRepository;

    @Autowired
    private BookRepository bookRepository;

    public boolean publisherExists(Long id) {
        return publisherRepository.findById(id).isPresent();
    }

    public void createNewPublisherIfNotExist(Set<Publisher> publishers) {
        for (Publisher p : publishers) {
            if (p.getId() == null) {
                if (p.getName() != null) {
                    Publisher savedPublisher = publisherRepository.save(p);
                    System.out.println("Created new publisher " + savedPublisher);
                }
            }
        }
    }

    public Set<Publisher> findPublisherObjectsFromIds(Set<Publisher> publishers) {
        createNewPublisherIfNotExist(publishers);
        publishers = publishers.stream().map(p -> {
            Optional<Publisher> optionalPublisher = publisherRepository.findById(p.getId());
            return optionalPublisher.orElseGet(() -> publisherRepository.save(p));
        }).collect(Collectors.toSet());

        return publishers;
    }

    public long publisherWithNameExists(String name) {
        Publisher publisher = publisherRepository.findByName(name);
        if (publisher != null) {
            return publisher.getId();
        } else {
            return -1;
        }
    }

}
