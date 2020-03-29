package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.GameUser;
import com.mycompany.myapp.repository.GameUserRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.GameUser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GameUserResource {

    private final Logger log = LoggerFactory.getLogger(GameUserResource.class);

    private static final String ENTITY_NAME = "gameUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GameUserRepository gameUserRepository;

    public GameUserResource(GameUserRepository gameUserRepository) {
        this.gameUserRepository = gameUserRepository;
    }

    /**
     * {@code POST  /game-users} : Create a new gameUser.
     *
     * @param gameUser the gameUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gameUser, or with status {@code 400 (Bad Request)} if the gameUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/game-users")
    public ResponseEntity<GameUser> createGameUser(@RequestBody GameUser gameUser) throws URISyntaxException {
        log.debug("REST request to save GameUser : {}", gameUser);
        if (gameUser.getId() != null) {
            throw new BadRequestAlertException("A new gameUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GameUser result = gameUserRepository.save(gameUser);
        return ResponseEntity.created(new URI("/api/game-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /game-users} : Updates an existing gameUser.
     *
     * @param gameUser the gameUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gameUser,
     * or with status {@code 400 (Bad Request)} if the gameUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gameUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/game-users")
    public ResponseEntity<GameUser> updateGameUser(@RequestBody GameUser gameUser) throws URISyntaxException {
        log.debug("REST request to update GameUser : {}", gameUser);
        if (gameUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GameUser result = gameUserRepository.save(gameUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, gameUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /game-users} : get all the gameUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gameUsers in body.
     */
    @GetMapping("/game-users")
    public List<GameUser> getAllGameUsers() {
        log.debug("REST request to get all GameUsers");
        return gameUserRepository.findAll();
    }

    /**
     * {@code GET  /game-users/:id} : get the "id" gameUser.
     *
     * @param id the id of the gameUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gameUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/game-users/{id}")
    public ResponseEntity<GameUser> getGameUser(@PathVariable Long id) {
        log.debug("REST request to get GameUser : {}", id);
        Optional<GameUser> gameUser = gameUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gameUser);
    }

    /**
     * {@code DELETE  /game-users/:id} : delete the "id" gameUser.
     *
     * @param id the id of the gameUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/game-users/{id}")
    public ResponseEntity<Void> deleteGameUser(@PathVariable Long id) {
        log.debug("REST request to delete GameUser : {}", id);
        gameUserRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
