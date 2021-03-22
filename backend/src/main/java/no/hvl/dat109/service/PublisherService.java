package no.hvl.dat109.service;

import no.hvl.dat109.entity.Publisher;
import no.hvl.dat109.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

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

}
