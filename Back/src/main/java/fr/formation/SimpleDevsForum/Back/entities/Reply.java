package fr.formation.SimpleDevsForum.Back.entities;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="replies")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String postId;

    private String topicPostId;

    private Timestamp submitDate;

    private String nickname;

    private String replyMsg;

    private String replyCode;

    @ManyToOne(cascade={CascadeType.MERGE,CascadeType.REFRESH})
    @JoinColumn (name = "devs_id")
    private Dev dev;

    @Column(name = "topics_id")
    private Long topicId;

    public Reply() {
        //
    }

    public Long getId() { return id; }
    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }
    public String getTopicPostId() { return topicPostId; }
    public void setTopicPostId(String topicPostId) { this.topicPostId = topicPostId; }
    public Timestamp getSubmitDate() { return submitDate; }
    public void setSubmitDate(Timestamp submitDate) { this.submitDate = submitDate; }
    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public String getReplyMsg() { return replyMsg; }
    public void setReplyMsg(String replyMsg) { this.replyMsg = replyMsg; }
    public String getReplyCode() { return replyCode; }
    public void setReplyCode(String replyCode) { this.replyCode = replyCode; }
    public Dev getDev() { return dev; }
    public void setDev(Dev dev) { this.dev = dev; }
    public Long getTopicId() { return topicId; }
    public void setTopicId(Long topicId) { this.topicId = topicId; }
}
