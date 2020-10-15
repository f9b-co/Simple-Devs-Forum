package fr.formation.SimpleDevsForum.Back.dtos;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table(name="")
public class ReplyCreateDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 16, max = 64)
    private String postId;

    @NotBlank
    @Size(min = 13, max = 32)
    private Timestamp submitDateTime;

    @NotBlank
    @Size(min = 2, max = 32)
    private String replyNickname;

    @NotBlank
    @Size(max = 500)
    private String replyMsg;

    @Size(max = 500)
    private String replyCode;

    public ReplyCreateDto() {
        //
    }

    public String getPostId() {
        return postId;
    }
    public Timestamp getSubmitDateTime() {
        return submitDateTime;
    }
    public String getReplyNickname() {
        return replyNickname;
    }
    public String getReplyMsg() {
        return replyMsg;
    }
    public String getReplyCode() {
        return replyCode;
    }
}
