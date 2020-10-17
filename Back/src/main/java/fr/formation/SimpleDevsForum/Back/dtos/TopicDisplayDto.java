package fr.formation.SimpleDevsForum.Back.dtos;

import java.sql.Timestamp;
import java.util.Set;

public interface TopicDisplayDto {

    Long getId();

    String getPostId();

    Timestamp getSubmitDate();

    String getNickname();

    String getSubject();

    String getTopicMsg();

    Set<ReplyDisplayDto> getReplies();

}
