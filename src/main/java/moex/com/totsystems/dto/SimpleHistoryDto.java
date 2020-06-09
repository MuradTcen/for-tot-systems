package moex.com.totsystems.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import moex.com.totsystems.entity.History;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class SimpleHistoryDto {

    public SimpleHistoryDto(History history) {
        this.secid = history.getSecid();
        this.regnumber = history.getSecurity().getRegnumber();
        this.name = history.getSecurity().getName();
        this.emitentTitle = history.getSecurity().getEmitentTitle();
        this.tradedate = history.getTradedate();
        this.numtrades = history.getNumtrades();
        this.open = history.getOpen();
        this.close = history.getClose();
    }

    private String secid;
    private String regnumber;
    private String name;
    private String emitentTitle;
    private LocalDate tradedate;
    private double numtrades;
    private double open;
    private double close;

    public static SimpleHistoryDto of(History history) {
        SimpleHistoryDto simpleHistoryDto = new SimpleHistoryDto();
        simpleHistoryDto.setSecid(history.getSecid());
        simpleHistoryDto.setRegnumber(history.getSecurity().getRegnumber());
        simpleHistoryDto.setName(history.getSecurity().getName());
        simpleHistoryDto.setEmitentTitle(history.getSecurity().getEmitentTitle());
        simpleHistoryDto.setTradedate(history.getTradedate());
        simpleHistoryDto.setNumtrades(history.getNumtrades());
        simpleHistoryDto.setOpen(history.getOpen());
        simpleHistoryDto.setClose(history.getClose());

        return simpleHistoryDto;
    }
}
