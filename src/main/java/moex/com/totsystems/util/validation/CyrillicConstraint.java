package moex.com.totsystems.util.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;

@Target({METHOD, FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = CyrillicConstraintValidator.class)
public @interface CyrillicConstraint {
    String message() default "only cyrillic, spaces and digits";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
