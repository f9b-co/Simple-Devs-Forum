package fr.formation.SimpleDevsForum.Back.entities;

import javax.persistence.*;

@Entity
@Table(name="devs")
public class Dev {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nickname;

    public Dev() {
        //
    }

    public Dev(String nickname) {
        this.nickname = nickname;
    }

    public Long getId() { return id; }
    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }

}
