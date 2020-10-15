package fr.formation.SimpleDevsForum.Back.entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table(name="")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String postId;

    private Timestamp submitDateTime;

    private String nickname;

    private String topicMsg;

    private Set<Reply> replies;

    public Topic() {
        //
    }

    public Long getId() {
        return id;
    }
    public String getPostId() {
        return postId;
    }
    public void setPostId(String postId) {
        this.postId = postId;
    }
    public Timestamp getSubmitDateTime() {
        return submitDateTime;
    }
    public void setSubmitDateTime(Timestamp submitDateTime) {
        this.submitDateTime = submitDateTime;
    }
    public String getNickname() {
        return nickname;
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    public String getTopicMsg() {
        return topicMsg;
    }
    public void setTopicMsg(String topicMsg) {
        this.topicMsg = topicMsg;
    }
    public Set<Reply> getReplies() {
        return replies;
    }
    public void setReplies(Set<Reply> replies) {
        this.replies = replies;
    }
}
