package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A GameCommission.
 */
@Entity
@Table(name = "game_commission")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GameCommission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "commission")
    private Integer commission;

    @ManyToOne
    @JsonIgnoreProperties("gameCommissions")
    private Game game;

    @ManyToOne
    @JsonIgnoreProperties("commissions")
    private GameUser gameUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCommission() {
        return commission;
    }

    public GameCommission commission(Integer commission) {
        this.commission = commission;
        return this;
    }

    public void setCommission(Integer commission) {
        this.commission = commission;
    }

    public Game getGame() {
        return game;
    }

    public GameCommission game(Game game) {
        this.game = game;
        return this;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public GameUser getGameUser() {
        return gameUser;
    }

    public GameCommission gameUser(GameUser gameUser) {
        this.gameUser = gameUser;
        return this;
    }

    public void setGameUser(GameUser gameUser) {
        this.gameUser = gameUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GameCommission)) {
            return false;
        }
        return id != null && id.equals(((GameCommission) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "GameCommission{" +
            "id=" + getId() +
            ", commission=" + getCommission() +
            "}";
    }
}
