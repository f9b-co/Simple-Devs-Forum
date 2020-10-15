package fr.formation.SimpleDevsForum.Back.entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table(name="")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String postId;

    private Timestamp submitDateTime;

    private String replyNickname;

    private String replyMsg;

    private String replyCode;

    public Reply() {
    }

    public Long getId() { return id; }
    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }
    public Timestamp getSubmitDateTime() { return submitDateTime; }
    public void setSubmitDateTime(Timestamp submitDateTime) { this.submitDateTime = submitDateTime; }
    public String getReplyNickname() { return replyNickname; }
    public void setReplyNickname(String replyNickname) { this.replyNickname = replyNickname; }
    public String getReplyMsg() { return replyMsg; }
    public void setReplyMsg(String replyMsg) { this.replyMsg = replyMsg; }
    public String getReplyCode() { return replyCode; }
    public void setReplyCode(String replyCode) { this.replyCode = replyCode; }

}
