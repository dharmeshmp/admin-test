package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Bet.
 */
@Entity
@Table(name = "bet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "chips")
    private Integer chips;

    @ManyToOne
    @JsonIgnoreProperties("bets")
    private GameUser user;

    @ManyToOne
    @JsonIgnoreProperties("bets")
    private Hand hand;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getChips() {
        return chips;
    }

    public Bet chips(Integer chips) {
        this.chips = chips;
        return this;
    }

    public void setChips(Integer chips) {
        this.chips = chips;
    }

    public GameUser getUser() {
        return user;
    }

    public Bet user(GameUser gameUser) {
        this.user = gameUser;
        return this;
    }

    public void setUser(GameUser gameUser) {
        this.user = gameUser;
    }

    public Hand getHand() {
        return hand;
    }

    public Bet hand(Hand hand) {
        this.hand = hand;
        return this;
    }

    public void setHand(Hand hand) {
        this.hand = hand;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bet)) {
            return false;
        }
        return id != null && id.equals(((Bet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Bet{" +
            "id=" + getId() +
            ", chips=" + getChips() +
            "}";
    }
}
