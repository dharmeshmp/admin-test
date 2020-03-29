package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Bet;
import com.mycompany.myapp.repository.BetRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Bet}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BetResource {

    private final Logger log = LoggerFactory.getLogger(BetResource.class);

    private static final String ENTITY_NAME = "bet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BetRepository betRepository;

    public BetResource(BetRepository betRepository) {
        this.betRepository = betRepository;
    }

    /**
     * {@code POST  /bets} : Create a new bet.
     *
     * @param bet the bet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bet, or with status {@code 400 (Bad Request)} if the bet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/bets")
    public ResponseEntity<Bet> createBet(@RequestBody Bet bet) throws URISyntaxException {
        log.debug("REST request to save Bet : {}", bet);
        if (bet.getId() != null) {
            throw new BadRequestAlertException("A new bet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bet result = betRepository.save(bet);
        return ResponseEntity.created(new URI("/api/bets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /bets} : Updates an existing bet.
     *
     * @param bet the bet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bet,
     * or with status {@code 400 (Bad Request)} if the bet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/bets")
    public ResponseEntity<Bet> updateBet(@RequestBody Bet bet) throws URISyntaxException {
        log.debug("REST request to update Bet : {}", bet);
        if (bet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bet result = betRepository.save(bet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bet.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /bets} : get all the bets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bets in body.
     */
    @GetMapping("/bets")
    public List<Bet> getAllBets() {
        log.debug("REST request to get all Bets");
        return betRepository.findAll();
    }

    /**
     * {@code GET  /bets/:id} : get the "id" bet.
     *
     * @param id the id of the bet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bets/{id}")
    public ResponseEntity<Bet> getBet(@PathVariable Long id) {
        log.debug("REST request to get Bet : {}", id);
        Optional<Bet> bet = betRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bet);
    }

    /**
     * {@code DELETE  /bets/:id} : delete the "id" bet.
     *
     * @param id the id of the bet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/bets/{id}")
    public ResponseEntity<Void> deleteBet(@PathVariable Long id) {
        log.debug("REST request to delete Bet : {}", id);
        betRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
