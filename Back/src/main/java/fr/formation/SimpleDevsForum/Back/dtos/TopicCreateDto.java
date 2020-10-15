package fr.formation.SimpleDevsForum.Back.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

public class TopicCreateDto {

    @NotBlank
    @Size(min = 16, max = 64)
    private String postId;

    @NotBlank
    @Size(min = 13, max = 32)
    private Timestamp submitDateTime;

    @NotBlank
    @Size(min = 2, max = 32)
    private String nickname;

    @Size(max = 500)
    private String topicMsg;

    public TopicCreateDto() {
        //
    }

    public String getPostId() {
        return postId;
    }
    public Timestamp getSubmitDateTime() {
        return submitDateTime;
    }
    public String getNickname() {
        return nickname;
    }
    public String getTopicMsg() {
        return topicMsg;
    }
}
