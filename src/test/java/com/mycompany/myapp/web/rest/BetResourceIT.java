package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.AdminApp;
import com.mycompany.myapp.domain.Bet;
import com.mycompany.myapp.repository.BetRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.BetStatus;
/**
 * Integration tests for the {@link BetResource} REST controller.
 */
@SpringBootTest(classes = AdminApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class BetResourceIT {

    private static final BigDecimal DEFAULT_CHIPS = new BigDecimal(1);
    private static final BigDecimal UPDATED_CHIPS = new BigDecimal(2);

    private static final BetStatus DEFAULT_STATUS = BetStatus.Start;
    private static final BetStatus UPDATED_STATUS = BetStatus.Finish;

    @Autowired
    private BetRepository betRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBetMockMvc;

    private Bet bet;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bet createEntity(EntityManager em) {
        Bet bet = new Bet()
            .chips(DEFAULT_CHIPS)
            .status(DEFAULT_STATUS);
        return bet;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bet createUpdatedEntity(EntityManager em) {
        Bet bet = new Bet()
            .chips(UPDATED_CHIPS)
            .status(UPDATED_STATUS);
        return bet;
    }

    @BeforeEach
    public void initTest() {
        bet = createEntity(em);
    }

    @Test
    @Transactional
    public void createBet() throws Exception {
        int databaseSizeBeforeCreate = betRepository.findAll().size();

        // Create the Bet
        restBetMockMvc.perform(post("/api/bets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bet)))
            .andExpect(status().isCreated());

        // Validate the Bet in the database
        List<Bet> betList = betRepository.findAll();
        assertThat(betList).hasSize(databaseSizeBeforeCreate + 1);
        Bet testBet = betList.get(betList.size() - 1);
        assertThat(testBet.getChips()).isEqualTo(DEFAULT_CHIPS);
        assertThat(testBet.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createBetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = betRepository.findAll().size();

        // Create the Bet with an existing ID
        bet.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBetMockMvc.perform(post("/api/bets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bet)))
            .andExpect(status().isBadRequest());

        // Validate the Bet in the database
        List<Bet> betList = betRepository.findAll();
        assertThat(betList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBets() throws Exception {
        // Initialize the database
        betRepository.saveAndFlush(bet);

        // Get all the betList
        restBetMockMvc.perform(get("/api/bets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bet.getId().intValue())))
            .andExpect(jsonPath("$.[*].chips").value(hasItem(DEFAULT_CHIPS.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getBet() throws Exception {
        // Initialize the database
        betRepository.saveAndFlush(bet);

        // Get the bet
        restBetMockMvc.perform(get("/api/bets/{id}", bet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bet.getId().intValue()))
            .andExpect(jsonPath("$.chips").value(DEFAULT_CHIPS.intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBet() throws Exception {
        // Get the bet
        restBetMockMvc.perform(get("/api/bets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBet() throws Exception {
        // Initialize the database
        betRepository.saveAndFlush(bet);

        int databaseSizeBeforeUpdate = betRepository.findAll().size();

        // Update the bet
        Bet updatedBet = betRepository.findById(bet.getId()).get();
        // Disconnect from session so that the updates on updatedBet are not directly saved in db
        em.detach(updatedBet);
        updatedBet
            .chips(UPDATED_CHIPS)
            .status(UPDATED_STATUS);

        restBetMockMvc.perform(put("/api/bets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBet)))
            .andExpect(status().isOk());

        // Validate the Bet in the database
        List<Bet> betList = betRepository.findAll();
        assertThat(betList).hasSize(databaseSizeBeforeUpdate);
        Bet testBet = betList.get(betList.size() - 1);
        assertThat(testBet.getChips()).isEqualTo(UPDATED_CHIPS);
        assertThat(testBet.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingBet() throws Exception {
        int databaseSizeBeforeUpdate = betRepository.findAll().size();

        // Create the Bet

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBetMockMvc.perform(put("/api/bets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(bet)))
            .andExpect(status().isBadRequest());

        // Validate the Bet in the database
        List<Bet> betList = betRepository.findAll();
        assertThat(betList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBet() throws Exception {
        // Initialize the database
        betRepository.saveAndFlush(bet);

        int databaseSizeBeforeDelete = betRepository.findAll().size();

        // Delete the bet
        restBetMockMvc.perform(delete("/api/bets/{id}", bet.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bet> betList = betRepository.findAll();
        assertThat(betList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
