package fr.formation.SimpleDevsForum.Back.repositories;

import fr.formation.SimpleDevsForum.Back.dtos.ReplyDisplayDto;
import fr.formation.SimpleDevsForum.Back.dtos.TopicDisplayDto;
import fr.formation.SimpleDevsForum.Back.entities.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ReplyRepo extends JpaRepository<Reply, Long> {

    Optional<ReplyDisplayDto> findByPostId(String postId);

}
