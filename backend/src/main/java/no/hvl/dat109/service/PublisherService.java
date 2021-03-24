package no.hvl.dat109.service;

import no.hvl.dat109.entity.Author;
import no.hvl.dat109.entity.Publisher;
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

    public boolean publisherExists(Long id) {
        return publisherRepository.findById(id).isPresent();
    }

    public boolean atLeastOnePublisherNotExists(Set<Publisher> publishers) {
        return publishers.stream().anyMatch(a -> !publisherExists(a.getId()));
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

}
