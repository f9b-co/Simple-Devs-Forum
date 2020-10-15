package fr.formation.SimpleDevsForum.Back.dtos;

import fr.formation.SimpleDevsForum.Back.entities.Reply;

import java.sql.Timestamp;
import java.util.Set;

public interface TopicDisplayDto {

    Long getId();  //?

    String getPostId();

    Timestamp getSubmitDateTime();

    String getNickname();

    String getTopicMsg();

    Set<ReplyDisplayDto> getReplies();

}
