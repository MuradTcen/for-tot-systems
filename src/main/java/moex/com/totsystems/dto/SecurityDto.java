package moex.com.totsystems.dto;

import lombok.Data;
import moex.com.totsystems.util.validation.CyrillicConstraint;

@Data
public class SecurityDto {

    private final String secid;
    private final String shortname;
    private final String regnumber;
    @CyrillicConstraint
    private final String name;
    private final boolean isTraded;
    private final String emitentTitle;
}
