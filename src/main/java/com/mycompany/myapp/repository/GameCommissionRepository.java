package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.GameCommission;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GameCommission entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GameCommissionRepository extends JpaRepository<GameCommission, Long> {
}
