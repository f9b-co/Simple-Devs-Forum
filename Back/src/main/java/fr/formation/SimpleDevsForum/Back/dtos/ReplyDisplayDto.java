package fr.formation.SimpleDevsForum.Back.dtos;

import java.sql.Timestamp;

public interface ReplyDisplayDto {

    Long getId();

    String getPostId();

    String getTopicPostId();

    Timestamp getSubmitDate();

    String getNickname();

    String getReplyMsg();

    String getReplyCode();

}
