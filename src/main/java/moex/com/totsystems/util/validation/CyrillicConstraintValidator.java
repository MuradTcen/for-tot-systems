package moex.com.totsystems.util.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CyrillicConstraintValidator implements ConstraintValidator<CyrillicConstraint, String> {
    private static final String regex = "[а-яёА-ЯЁ\\s\\d]*";

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        Pattern pattern = Pattern.compile(regex);

        Matcher m = pattern.matcher(value);

        return m.matches();
    }
}
