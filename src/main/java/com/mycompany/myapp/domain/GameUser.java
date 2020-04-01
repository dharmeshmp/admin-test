package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * A GameUser.
 */
@Entity
@Table(name = "game_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GameUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "chips", precision = 21, scale = 2)
    private BigDecimal chips;

    @OneToMany(mappedBy = "gameUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GameCommission> commissions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("gameUsers")
    private Role role;

    @ManyToOne
    @JsonIgnoreProperties("gameUsers")
    private GameUser parent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public GameUser username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public GameUser password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public BigDecimal getChips() {
        return chips;
    }

    public GameUser chips(BigDecimal chips) {
        this.chips = chips;
        return this;
    }

    public void setChips(BigDecimal chips) {
        this.chips = chips;
    }

    public Set<GameCommission> getCommissions() {
        return commissions;
    }

    public GameUser commissions(Set<GameCommission> gameCommissions) {
        this.commissions = gameCommissions;
        return this;
    }

    public GameUser addCommission(GameCommission gameCommission) {
        this.commissions.add(gameCommission);
        gameCommission.setGameUser(this);
        return this;
    }

    public GameUser removeCommission(GameCommission gameCommission) {
        this.commissions.remove(gameCommission);
        gameCommission.setGameUser(null);
        return this;
    }

    public void setCommissions(Set<GameCommission> gameCommissions) {
        this.commissions = gameCommissions;
    }

    public Role getRole() {
        return role;
    }

    public GameUser role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public GameUser getParent() {
        return parent;
    }

    public GameUser parent(GameUser gameUser) {
        this.parent = gameUser;
        return this;
    }

    public void setParent(GameUser gameUser) {
        this.parent = gameUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GameUser)) {
            return false;
        }
        return id != null && id.equals(((GameUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "GameUser{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            ", chips=" + getChips() +
            "}";
    }
}
