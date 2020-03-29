package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class GameCommissionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GameCommission.class);
        GameCommission gameCommission1 = new GameCommission();
        gameCommission1.setId(1L);
        GameCommission gameCommission2 = new GameCommission();
        gameCommission2.setId(gameCommission1.getId());
        assertThat(gameCommission1).isEqualTo(gameCommission2);
        gameCommission2.setId(2L);
        assertThat(gameCommission1).isNotEqualTo(gameCommission2);
        gameCommission1.setId(null);
        assertThat(gameCommission1).isNotEqualTo(gameCommission2);
    }
}
