package moex.com.totsystems.entity;

import lombok.Data;
import moex.com.totsystems.dto.HistoryDto;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity(name = "histories")
@EntityListeners(AuditingEntityListener.class)
@Data
public class History extends BaseEntity {

    @Id
    private String secid;
    @Column
    private LocalDate tradedate;
    @Column
    private double numtrades;
    @Column
    private double value;
    @Column
    private double open;
    @Column
    private double low;
    @Column
    private double high;
    @Column
    private double close;
    @Column
    private double volume;

    // Можно использовать mapstrcuct
    public static History ofHistoryDto(HistoryDto historyDto) {
        History history = new History();

        history.setVolume(historyDto.getVolume());
        history.setClose(historyDto.getClose());
        history.setHigh(historyDto.getHigh());
        history.setLow(historyDto.getLow());
        history.setOpen(historyDto.getOpen());
        history.setNumtrades(historyDto.getNumtrades());
        history.setTradedate(historyDto.getTradedate());
        history.setSecid(historyDto.getSecid());

        return history;
    }
}
