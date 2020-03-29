package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.AdminApp;
import com.mycompany.myapp.domain.Hand;
import com.mycompany.myapp.repository.HandRepository;

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

import com.mycompany.myapp.domain.enumeration.HandStatus;
/**
 * Integration tests for the {@link HandResource} REST controller.
 */
@SpringBootTest(classes = AdminApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class HandResourceIT {

    private static final HandStatus DEFAULT_STATUS = HandStatus.Begin;
    private static final HandStatus UPDATED_STATUS = HandStatus.End;

    @Autowired
    private HandRepository handRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHandMockMvc;

    private Hand hand;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hand createEntity(EntityManager em) {
        Hand hand = new Hand()
            .status(DEFAULT_STATUS);
        return hand;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hand createUpdatedEntity(EntityManager em) {
        Hand hand = new Hand()
            .status(UPDATED_STATUS);
        return hand;
    }

    @BeforeEach
    public void initTest() {
        hand = createEntity(em);
    }

    @Test
    @Transactional
    public void createHand() throws Exception {
        int databaseSizeBeforeCreate = handRepository.findAll().size();

        // Create the Hand
        restHandMockMvc.perform(post("/api/hands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(hand)))
            .andExpect(status().isCreated());

        // Validate the Hand in the database
        List<Hand> handList = handRepository.findAll();
        assertThat(handList).hasSize(databaseSizeBeforeCreate + 1);
        Hand testHand = handList.get(handList.size() - 1);
        assertThat(testHand.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createHandWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = handRepository.findAll().size();

        // Create the Hand with an existing ID
        hand.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHandMockMvc.perform(post("/api/hands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(hand)))
            .andExpect(status().isBadRequest());

        // Validate the Hand in the database
        List<Hand> handList = handRepository.findAll();
        assertThat(handList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllHands() throws Exception {
        // Initialize the database
        handRepository.saveAndFlush(hand);

        // Get all the handList
        restHandMockMvc.perform(get("/api/hands?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hand.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getHand() throws Exception {
        // Initialize the database
        handRepository.saveAndFlush(hand);

        // Get the hand
        restHandMockMvc.perform(get("/api/hands/{id}", hand.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(hand.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHand() throws Exception {
        // Get the hand
        restHandMockMvc.perform(get("/api/hands/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHand() throws Exception {
        // Initialize the database
        handRepository.saveAndFlush(hand);

        int databaseSizeBeforeUpdate = handRepository.findAll().size();

        // Update the hand
        Hand updatedHand = handRepository.findById(hand.getId()).get();
        // Disconnect from session so that the updates on updatedHand are not directly saved in db
        em.detach(updatedHand);
        updatedHand
            .status(UPDATED_STATUS);

        restHandMockMvc.perform(put("/api/hands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHand)))
            .andExpect(status().isOk());

        // Validate the Hand in the database
        List<Hand> handList = handRepository.findAll();
        assertThat(handList).hasSize(databaseSizeBeforeUpdate);
        Hand testHand = handList.get(handList.size() - 1);
        assertThat(testHand.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingHand() throws Exception {
        int databaseSizeBeforeUpdate = handRepository.findAll().size();

        // Create the Hand

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHandMockMvc.perform(put("/api/hands")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(hand)))
            .andExpect(status().isBadRequest());

        // Validate the Hand in the database
        List<Hand> handList = handRepository.findAll();
        assertThat(handList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHand() throws Exception {
        // Initialize the database
        handRepository.saveAndFlush(hand);

        int databaseSizeBeforeDelete = handRepository.findAll().size();

        // Delete the hand
        restHandMockMvc.perform(delete("/api/hands/{id}", hand.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Hand> handList = handRepository.findAll();
        assertThat(handList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
