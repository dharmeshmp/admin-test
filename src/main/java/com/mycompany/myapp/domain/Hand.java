package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import com.mycompany.myapp.domain.enumeration.HandStatus;

/**
 * A Hand.
 */
@Entity
@Table(name = "hand")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Hand implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private HandStatus status;

    @OneToMany(mappedBy = "hand")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Bet> bets = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("hands")
    private Game game;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public HandStatus getStatus() {
        return status;
    }

    public Hand status(HandStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(HandStatus status) {
        this.status = status;
    }

    public Set<Bet> getBets() {
        return bets;
    }

    public Hand bets(Set<Bet> bets) {
        this.bets = bets;
        return this;
    }

    public Hand addBet(Bet bet) {
        this.bets.add(bet);
        bet.setHand(this);
        return this;
    }

    public Hand removeBet(Bet bet) {
        this.bets.remove(bet);
        bet.setHand(null);
        return this;
    }

    public void setBets(Set<Bet> bets) {
        this.bets = bets;
    }

    public Game getGame() {
        return game;
    }

    public Hand game(Game game) {
        this.game = game;
        return this;
    }

    public void setGame(Game game) {
        this.game = game;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Hand)) {
            return false;
        }
        return id != null && id.equals(((Hand) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Hand{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
