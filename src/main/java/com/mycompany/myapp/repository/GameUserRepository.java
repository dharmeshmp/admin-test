package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.GameUser;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GameUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GameUserRepository extends JpaRepository<GameUser, Long> {
}
