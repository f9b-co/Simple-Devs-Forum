package fr.formation.SimpleDevsForum.Back.repositories;

import fr.formation.SimpleDevsForum.Back.dtos.TopicDisplayDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepo {

    Optional<TopicDisplayDto> findByPostId(String postId);

    List<TopicDisplayDto> findAll();

}
