package fr.formation.SimpleDevsForum.Back.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

public class ReplyCreateDto {

    @NotBlank
    @Size(min = 16, max = 64)
    private String postId;

    @NotBlank
    @Size(min = 16, max = 64)
    private String topicPostId;

    @NotBlank
    @Size(min = 13, max = 32)
    private Timestamp submitDate;

    @NotBlank
    @Size(min = 2, max = 32)
    private String nickname;

    @NotBlank
    @Size(max = 500)
    private String replyMsg;

    @Size(max = 500)
    private String replyCode;

    public ReplyCreateDto() {
        //
    }

    public String getPostId() { return postId; }
    public String getTopicPostId() { return topicPostId; }
    public Timestamp getSubmitDate() {
        return submitDate;
    }
    public String getNickname() {
        return nickname;
    }
    public String getReplyMsg() {
        return replyMsg;
    }
    public String getReplyCode() {
        return replyCode;
    }
}
