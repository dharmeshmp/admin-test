package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;

import com.mycompany.myapp.domain.enumeration.BetStatus;

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

    @Column(name = "chips", precision = 21, scale = 2)
    private BigDecimal chips;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private BetStatus status;

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

    public BigDecimal getChips() {
        return chips;
    }

    public Bet chips(BigDecimal chips) {
        this.chips = chips;
        return this;
    }

    public void setChips(BigDecimal chips) {
        this.chips = chips;
    }

    public BetStatus getStatus() {
        return status;
    }

    public Bet status(BetStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(BetStatus status) {
        this.status = status;
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
            ", status='" + getStatus() + "'" +
            "}";
    }
}
