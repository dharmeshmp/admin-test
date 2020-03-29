package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class GameUserTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GameUser.class);
        GameUser gameUser1 = new GameUser();
        gameUser1.setId(1L);
        GameUser gameUser2 = new GameUser();
        gameUser2.setId(gameUser1.getId());
        assertThat(gameUser1).isEqualTo(gameUser2);
        gameUser2.setId(2L);
        assertThat(gameUser1).isNotEqualTo(gameUser2);
        gameUser1.setId(null);
        assertThat(gameUser1).isNotEqualTo(gameUser2);
    }
}
