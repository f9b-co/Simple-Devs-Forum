package fr.formation.SimpleDevsForum.Back.repositories;

import fr.formation.SimpleDevsForum.Back.dtos.TopicDisplayDto;
import fr.formation.SimpleDevsForum.Back.entities.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TopicRepo extends JpaRepository<Topic, Long> {

    Optional<Topic> findById(Long Id);

    Optional<TopicDisplayDto> findByPostId(String postId);

    Page<TopicDisplayDto> getAllProjectedBy(Pageable pageable);

}
