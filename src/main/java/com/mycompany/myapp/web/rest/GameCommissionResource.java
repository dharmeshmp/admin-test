package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.GameCommission;
import com.mycompany.myapp.repository.GameCommissionRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.GameCommission}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GameCommissionResource {

    private final Logger log = LoggerFactory.getLogger(GameCommissionResource.class);

    private static final String ENTITY_NAME = "gameCommission";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GameCommissionRepository gameCommissionRepository;

    public GameCommissionResource(GameCommissionRepository gameCommissionRepository) {
        this.gameCommissionRepository = gameCommissionRepository;
    }

    /**
     * {@code POST  /game-commissions} : Create a new gameCommission.
     *
     * @param gameCommission the gameCommission to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gameCommission, or with status {@code 400 (Bad Request)} if the gameCommission has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/game-commissions")
    public ResponseEntity<GameCommission> createGameCommission(@RequestBody GameCommission gameCommission) throws URISyntaxException {
        log.debug("REST request to save GameCommission : {}", gameCommission);
        if (gameCommission.getId() != null) {
            throw new BadRequestAlertException("A new gameCommission cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GameCommission result = gameCommissionRepository.save(gameCommission);
        return ResponseEntity.created(new URI("/api/game-commissions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /game-commissions} : Updates an existing gameCommission.
     *
     * @param gameCommission the gameCommission to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gameCommission,
     * or with status {@code 400 (Bad Request)} if the gameCommission is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gameCommission couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/game-commissions")
    public ResponseEntity<GameCommission> updateGameCommission(@RequestBody GameCommission gameCommission) throws URISyntaxException {
        log.debug("REST request to update GameCommission : {}", gameCommission);
        if (gameCommission.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GameCommission result = gameCommissionRepository.save(gameCommission);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, gameCommission.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /game-commissions} : get all the gameCommissions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gameCommissions in body.
     */
    @GetMapping("/game-commissions")
    public List<GameCommission> getAllGameCommissions() {
        log.debug("REST request to get all GameCommissions");
        return gameCommissionRepository.findAll();
    }

    /**
     * {@code GET  /game-commissions/:id} : get the "id" gameCommission.
     *
     * @param id the id of the gameCommission to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gameCommission, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/game-commissions/{id}")
    public ResponseEntity<GameCommission> getGameCommission(@PathVariable Long id) {
        log.debug("REST request to get GameCommission : {}", id);
        Optional<GameCommission> gameCommission = gameCommissionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gameCommission);
    }

    /**
     * {@code DELETE  /game-commissions/:id} : delete the "id" gameCommission.
     *
     * @param id the id of the gameCommission to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/game-commissions/{id}")
    public ResponseEntity<Void> deleteGameCommission(@PathVariable Long id) {
        log.debug("REST request to delete GameCommission : {}", id);
        gameCommissionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
