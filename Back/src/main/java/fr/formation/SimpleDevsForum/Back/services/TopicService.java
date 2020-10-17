package fr.formation.SimpleDevsForum.Back.services;

import fr.formation.SimpleDevsForum.Back.dtos.ReplyCreateDto;
import fr.formation.SimpleDevsForum.Back.dtos.TopicCreateDto;
import fr.formation.SimpleDevsForum.Back.dtos.TopicDisplayDto;
import fr.formation.SimpleDevsForum.Back.entities.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TopicService {

    void create(TopicCreateDto dto);

    TopicDisplayDto getOne(String postId);

    Page<TopicDisplayDto> getAll(Pageable pageable);

    void addReply(ReplyCreateDto dto);
}
