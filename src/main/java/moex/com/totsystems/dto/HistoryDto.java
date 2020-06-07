package moex.com.totsystems.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HistoryDto {

    private String secid;
    private LocalDate tradedate;
    private double numtrades;
    private double value;
    private double open;
    private double low;
    private double high;
    private double close;
    private double volume;
}
