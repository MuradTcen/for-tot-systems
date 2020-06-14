package moex.com.totsystems.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
public class HistoryDto {

    private final String secid;
    private final LocalDate tradedate;
    private final double numtrades;
    private final double value;
    private final double open;
    private final double low;
    private final double high;
    private final double close;
    private final double volume;
}
