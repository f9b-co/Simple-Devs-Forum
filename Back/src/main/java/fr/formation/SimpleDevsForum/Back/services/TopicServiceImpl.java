package fr.formation.SimpleDevsForum.Back.services;

import fr.formation.SimpleDevsForum.Back.dtos.ReplyCreateDto;
import fr.formation.SimpleDevsForum.Back.dtos.TopicCreateDto;
import fr.formation.SimpleDevsForum.Back.dtos.TopicDisplayDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicServiceImpl implements TopicService {

    @Override
    public void create(TopicCreateDto dto) {
        // to code
    }

    @Override
    public void addReply(ReplyCreateDto dto) {
        // to code
    }

    @Override
    public TopicDisplayDto getOne(String postId) {
        // to code
        return null;
    }

    @Override
    public List<TopicDisplayDto> getAll(Pageable pageable) {
        // to code
        return null;
    }

}
