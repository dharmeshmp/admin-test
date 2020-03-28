package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.AdminApp;
import com.mycompany.myapp.domain.GameUser;
import com.mycompany.myapp.repository.GameUserRepository;

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
 * Integration tests for the {@link GameUserResource} REST controller.
 */
@SpringBootTest(classes = AdminApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class GameUserResourceIT {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    @Autowired
    private GameUserRepository gameUserRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGameUserMockMvc;

    private GameUser gameUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GameUser createEntity(EntityManager em) {
        GameUser gameUser = new GameUser()
            .username(DEFAULT_USERNAME)
            .password(DEFAULT_PASSWORD);
        return gameUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GameUser createUpdatedEntity(EntityManager em) {
        GameUser gameUser = new GameUser()
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD);
        return gameUser;
    }

    @BeforeEach
    public void initTest() {
        gameUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createGameUser() throws Exception {
        int databaseSizeBeforeCreate = gameUserRepository.findAll().size();

        // Create the GameUser
        restGameUserMockMvc.perform(post("/api/game-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gameUser)))
            .andExpect(status().isCreated());

        // Validate the GameUser in the database
        List<GameUser> gameUserList = gameUserRepository.findAll();
        assertThat(gameUserList).hasSize(databaseSizeBeforeCreate + 1);
        GameUser testGameUser = gameUserList.get(gameUserList.size() - 1);
        assertThat(testGameUser.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testGameUser.getPassword()).isEqualTo(DEFAULT_PASSWORD);
    }

    @Test
    @Transactional
    public void createGameUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gameUserRepository.findAll().size();

        // Create the GameUser with an existing ID
        gameUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGameUserMockMvc.perform(post("/api/game-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gameUser)))
            .andExpect(status().isBadRequest());

        // Validate the GameUser in the database
        List<GameUser> gameUserList = gameUserRepository.findAll();
        assertThat(gameUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGameUsers() throws Exception {
        // Initialize the database
        gameUserRepository.saveAndFlush(gameUser);

        // Get all the gameUserList
        restGameUserMockMvc.perform(get("/api/game-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gameUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)));
    }
    
    @Test
    @Transactional
    public void getGameUser() throws Exception {
        // Initialize the database
        gameUserRepository.saveAndFlush(gameUser);

        // Get the gameUser
        restGameUserMockMvc.perform(get("/api/game-users/{id}", gameUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gameUser.getId().intValue()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD));
    }

    @Test
    @Transactional
    public void getNonExistingGameUser() throws Exception {
        // Get the gameUser
        restGameUserMockMvc.perform(get("/api/game-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGameUser() throws Exception {
        // Initialize the database
        gameUserRepository.saveAndFlush(gameUser);

        int databaseSizeBeforeUpdate = gameUserRepository.findAll().size();

        // Update the gameUser
        GameUser updatedGameUser = gameUserRepository.findById(gameUser.getId()).get();
        // Disconnect from session so that the updates on updatedGameUser are not directly saved in db
        em.detach(updatedGameUser);
        updatedGameUser
            .username(UPDATED_USERNAME)
            .password(UPDATED_PASSWORD);

        restGameUserMockMvc.perform(put("/api/game-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGameUser)))
            .andExpect(status().isOk());

        // Validate the GameUser in the database
        List<GameUser> gameUserList = gameUserRepository.findAll();
        assertThat(gameUserList).hasSize(databaseSizeBeforeUpdate);
        GameUser testGameUser = gameUserList.get(gameUserList.size() - 1);
        assertThat(testGameUser.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testGameUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
    }

    @Test
    @Transactional
    public void updateNonExistingGameUser() throws Exception {
        int databaseSizeBeforeUpdate = gameUserRepository.findAll().size();

        // Create the GameUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGameUserMockMvc.perform(put("/api/game-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gameUser)))
            .andExpect(status().isBadRequest());

        // Validate the GameUser in the database
        List<GameUser> gameUserList = gameUserRepository.findAll();
        assertThat(gameUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGameUser() throws Exception {
        // Initialize the database
        gameUserRepository.saveAndFlush(gameUser);

        int databaseSizeBeforeDelete = gameUserRepository.findAll().size();

        // Delete the gameUser
        restGameUserMockMvc.perform(delete("/api/game-users/{id}", gameUser.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GameUser> gameUserList = gameUserRepository.findAll();
        assertThat(gameUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
