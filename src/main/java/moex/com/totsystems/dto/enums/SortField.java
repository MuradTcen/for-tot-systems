package moex.com.totsystems.dto.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SortField {
    EMITENT_TITLE("security.emitentTitle"),
    TRADEDATE("tradedate");

    private final String name;
}
