package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.AdminApp;
import com.mycompany.myapp.domain.GameCommission;
import com.mycompany.myapp.repository.GameCommissionRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link GameCommissionResource} REST controller.
 */
@SpringBootTest(classes = AdminApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class GameCommissionResourceIT {

    private static final Integer DEFAULT_COMMISSION = 1;
    private static final Integer UPDATED_COMMISSION = 2;

    @Autowired
    private GameCommissionRepository gameCommissionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGameCommissionMockMvc;

    private GameCommission gameCommission;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GameCommission createEntity(EntityManager em) {
        GameCommission gameCommission = new GameCommission()
            .commission(DEFAULT_COMMISSION);
        return gameCommission;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GameCommission createUpdatedEntity(EntityManager em) {
        GameCommission gameCommission = new GameCommission()
            .commission(UPDATED_COMMISSION);
        return gameCommission;
    }

    @BeforeEach
    public void initTest() {
        gameCommission = createEntity(em);
    }

    @Test
    @Transactional
    public void createGameCommission() throws Exception {
        int databaseSizeBeforeCreate = gameCommissionRepository.findAll().size();

        // Create the GameCommission
        restGameCommissionMockMvc.perform(post("/api/game-commissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gameCommission)))
            .andExpect(status().isCreated());

        // Validate the GameCommission in the database
        List<GameCommission> gameCommissionList = gameCommissionRepository.findAll();
        assertThat(gameCommissionList).hasSize(databaseSizeBeforeCreate + 1);
        GameCommission testGameCommission = gameCommissionList.get(gameCommissionList.size() - 1);
        assertThat(testGameCommission.getCommission()).isEqualTo(DEFAULT_COMMISSION);
    }

    @Test
    @Transactional
    public void createGameCommissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gameCommissionRepository.findAll().size();

        // Create the GameCommission with an existing ID
        gameCommission.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGameCommissionMockMvc.perform(post("/api/game-commissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gameCommission)))
            .andExpect(status().isBadRequest());

        // Validate the GameCommission in the database
        List<GameCommission> gameCommissionList = gameCommissionRepository.findAll();
        assertThat(gameCommissionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGameCommissions() throws Exception {
        // Initialize the database
        gameCommissionRepository.saveAndFlush(gameCommission);

        // Get all the gameCommissionList
        restGameCommissionMockMvc.perform(get("/api/game-commissions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gameCommission.getId().intValue())))
            .andExpect(jsonPath("$.[*].commission").value(hasItem(DEFAULT_COMMISSION)));
    }
    
    @Test
    @Transactional
    public void getGameCommission() throws Exception {
        // Initialize the database
        gameCommissionRepository.saveAndFlush(gameCommission);

        // Get the gameCommission
        restGameCommissionMockMvc.perform(get("/api/game-commissions/{id}", gameCommission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gameCommission.getId().intValue()))
            .andExpect(jsonPath("$.commission").value(DEFAULT_COMMISSION));
    }

    @Test
    @Transactional
    public void getNonExistingGameCommission() throws Exception {
        // Get the gameCommission
        restGameCommissionMockMvc.perform(get("/api/game-commissions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGameCommission() throws Exception {
        // Initialize the database
        gameCommissionRepository.saveAndFlush(gameCommission);

        int databaseSizeBeforeUpdate = gameCommissionRepository.findAll().size();

        // Update the gameCommission
        GameCommission updatedGameCommission = gameCommissionRepository.findById(gameCommission.getId()).get();
        // Disconnect from session so that the updates on updatedGameCommission are not directly saved in db
        em.detach(updatedGameCommission);
        updatedGameCommission
            .commission(UPDATED_COMMISSION);

        restGameCommissionMockMvc.perform(put("/api/game-commissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGameCommission)))
            .andExpect(status().isOk());

        // Validate the GameCommission in the database
        List<GameCommission> gameCommissionList = gameCommissionRepository.findAll();
        assertThat(gameCommissionList).hasSize(databaseSizeBeforeUpdate);
        GameCommission testGameCommission = gameCommissionList.get(gameCommissionList.size() - 1);
        assertThat(testGameCommission.getCommission()).isEqualTo(UPDATED_COMMISSION);
    }

    @Test
    @Transactional
    public void updateNonExistingGameCommission() throws Exception {
        int databaseSizeBeforeUpdate = gameCommissionRepository.findAll().size();

        // Create the GameCommission

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGameCommissionMockMvc.perform(put("/api/game-commissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gameCommission)))
            .andExpect(status().isBadRequest());

        // Validate the GameCommission in the database
        List<GameCommission> gameCommissionList = gameCommissionRepository.findAll();
        assertThat(gameCommissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGameCommission() throws Exception {
        // Initialize the database
        gameCommissionRepository.saveAndFlush(gameCommission);

        int databaseSizeBeforeDelete = gameCommissionRepository.findAll().size();

        // Delete the gameCommission
        restGameCommissionMockMvc.perform(delete("/api/game-commissions/{id}", gameCommission.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GameCommission> gameCommissionList = gameCommissionRepository.findAll();
        assertThat(gameCommissionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
