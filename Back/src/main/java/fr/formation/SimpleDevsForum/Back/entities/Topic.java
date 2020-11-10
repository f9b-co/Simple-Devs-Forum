package fr.formation.SimpleDevsForum.Back.entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String postId;

    private Timestamp submitDate;

    private String nickname;

    private String subject;

    private String topicMsg;

    @ManyToOne(cascade={CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn (name = "devs_id")
    private Dev dev;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn (name = "topics_id")
    private List<Reply> replies;

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
    public Timestamp getSubmitDate() {
        return submitDate;
    }
    public void setSubmitDate(Timestamp submitDate) {
        this.submitDate = submitDate;
    }
    public String getNickname() {
        return nickname;
    }
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getTopicMsg() {
        return topicMsg;
    }
    public void setTopicMsg(String topicMsg) {
        this.topicMsg = topicMsg;
    }
    public Dev getDev() { return dev; }
    public void setDev(Dev dev) { this.dev = dev; }
    public List<Reply> getReplies() {
        return replies;
    }
    public void setReplies(List<Reply> replies) { this.replies = replies; };
}
