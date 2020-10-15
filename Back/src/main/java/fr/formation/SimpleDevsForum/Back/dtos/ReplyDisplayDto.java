package fr.formation.SimpleDevsForum.Back.dtos;

import java.sql.Timestamp;

public interface ReplyDisplayDto {

    Long getId(); //?

    String getPostId();

    Timestamp getSubmitDateTime();

    String getReplyNickname();

    String getReplyMsg();

    String getReplyCode();

}
