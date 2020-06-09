package moex.com.totsystems.dto.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FilterField {
    EMITENT_TITLE("emitentTitle"),
    TRADEDATE("tradedate");

    private final String name;
}
