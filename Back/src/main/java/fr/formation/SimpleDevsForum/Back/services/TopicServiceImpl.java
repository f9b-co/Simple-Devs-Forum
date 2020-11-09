package fr.formation.SimpleDevsForum.Back.services;

import fr.formation.SimpleDevsForum.Back.config.ResourceNotFoundException;
import fr.formation.SimpleDevsForum.Back.dtos.ReplyCreateDto;
import fr.formation.SimpleDevsForum.Back.dtos.TopicCreateDto;
import fr.formation.SimpleDevsForum.Back.dtos.TopicDisplayDto;
import fr.formation.SimpleDevsForum.Back.entities.Dev;
import fr.formation.SimpleDevsForum.Back.entities.Reply;
import fr.formation.SimpleDevsForum.Back.entities.Topic;
import fr.formation.SimpleDevsForum.Back.repositories.DevRepo;
import fr.formation.SimpleDevsForum.Back.repositories.ReplyRepo;
import fr.formation.SimpleDevsForum.Back.repositories.TopicRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class TopicServiceImpl implements TopicService {

    private final DevRepo devRepo;
    private final TopicRepo topicRepo;
    private final ReplyRepo replyRepo;

    public TopicServiceImpl(DevRepo devRepo, TopicRepo topicRepo, ReplyRepo replyRepo) {
        this.devRepo = devRepo;
        this.topicRepo = topicRepo;
        this.replyRepo = replyRepo;
    }

    public boolean devExist(String nickname) {
        return devRepo.findByNickname(nickname).isPresent();
    }

    @Override
    public void create(TopicCreateDto dto) {
        Set<Reply> replies = new HashSet<Reply>();
        Topic newTopic = new Topic();
        newTopic.setPostId(dto.getPostId());
        newTopic.setSubmitDate(dto.getSubmitDate());
        newTopic.setNickname(dto.getNickname());
        newTopic.setSubject(dto.getSubject());
        newTopic.setTopicMsg(dto.getTopicMsg());
        if(devExist(dto.getNickname())){
            newTopic.setDev(devRepo.findByNickname(dto.getNickname()).get());
        } else {
            newTopic.setDev(devRepo.save(new Dev(dto.getNickname())));
        }
        /*Dev dev = devRepo.findByNickname(dto.getNickname()).orElse(devRepo.save(new Dev(dto.getNickname())));
        newTopic.setDev(dev);*/
        topicRepo.save(newTopic);
    }

    @Override
    public void addReply(ReplyCreateDto dto) {
        TopicDisplayDto topicFromDto = topicRepo.findByPostId(dto.getTopicPostId())
                .orElseThrow(() -> new ResourceNotFoundException(
                "invalid topic Id, please retry/refresh"));
        Topic topic = topicRepo.findById(topicFromDto.getId()).get();
        Reply newReply = new Reply();
        newReply.setTopicPostId(dto.getTopicPostId());
        newReply.setPostId(dto.getPostId());
        newReply.setSubmitDate(dto.getSubmitDate());
        newReply.setNickname(dto.getNickname());
        newReply.setReplyMsg(dto.getReplyMsg());
        newReply.setReplyCode(dto.getReplyCode());
        if(devExist(dto.getNickname())){
            newReply.setDev(devRepo.findByNickname(dto.getNickname()).get());
        } else {
            newReply.setDev(devRepo.save(new Dev(dto.getNickname())));
        }
        newReply.setTopicId(topic.getId());
        replyRepo.save(newReply);
        Set<Reply> replies = topic.getReplies();
        replies.add(newReply);
        topic.setReplies(replies);
        topicRepo.save(topic);
    }

    @Override
    public TopicDisplayDto getOne(String postId) throws ResourceNotFoundException {
        TopicDisplayDto topic = topicRepo.findByPostId(postId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "no topic found with topic Id: " + postId));
        return topic;
    }

    @Override
    public Page<TopicDisplayDto> getAll(Pageable pageable) {
        return topicRepo.getAllProjectedBy(pageable);
    }

}
