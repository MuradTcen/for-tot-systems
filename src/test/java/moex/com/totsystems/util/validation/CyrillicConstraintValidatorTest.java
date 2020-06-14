package moex.com.totsystems.util.validation;

import moex.com.totsystems.dto.SecurityDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@DirtiesContext
class CyrillicConstraintValidatorTest {
    private Validator validator;

    @BeforeEach
    public void setUpClass() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    private static SecurityDto getSecurityDto(String name) {
        return new SecurityDto("", "", "", name, true, "");
    }

    @Test
    void isValid_whenLatin_thenViolation() {
        SecurityDto securityDto = getSecurityDto("Latin");
        Set<ConstraintViolation<SecurityDto>> constraintViolations = validator.validate(securityDto);
        assertThat(constraintViolations).hasSize(1);
    }

    @Test
    void isValid_whenDigits_thenViolation() {
        SecurityDto securityDto = getSecurityDto("123");
        Set<ConstraintViolation<SecurityDto>> constraintViolations = validator.validate(securityDto);
        assertThat(constraintViolations).hasSize(0);
    }

    @Test
    void isValid_whenSpace_thenHasNotViolations() {
        SecurityDto securityDto = getSecurityDto(" ");
        Set<ConstraintViolation<SecurityDto>> constraintViolations = validator.validate(securityDto);
        assertThat(constraintViolations).hasSize(1);
    }

    @Test
    void isValid_whenCyrillic_thenHasNotViolations() {
        SecurityDto securityDto = getSecurityDto("Ёё");
        Set<ConstraintViolation<SecurityDto>> constraintViolations = validator.validate(securityDto);
        assertThat(constraintViolations).hasSize(0);
    }
    @Test
    void isValid_whenCyrillicAndSpace_thenHasNotViolations() {
        SecurityDto securityDto = getSecurityDto("Кириллица Ёё");
        Set<ConstraintViolation<SecurityDto>> constraintViolations = validator.validate(securityDto);
        assertThat(constraintViolations).hasSize(0);
    }

    @Test
    void isValid_whenCyrillicAndLatin_thanViolation() {
        SecurityDto securityDto = getSecurityDto("Latin ёёЁ");
        Set<ConstraintViolation<SecurityDto>> constraintViolations = validator.validate(securityDto);
        assertThat(constraintViolations).hasSize(1);
    }
}