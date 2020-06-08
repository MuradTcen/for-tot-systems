package moex.com.totsystems.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import moex.com.totsystems.dto.HistoryDto;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;

@Entity(name = "histories")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@IdClass(Trade.class)
public class History extends BaseEntity {

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

    @Id
    private String secid;
    @Id
    private LocalDate tradedate;

    History(Trade trade) {
        secid = trade.getSecid();
        tradedate = trade.getTradedate();
    }

    @Id
    @AttributeOverrides({
            @AttributeOverride(name = "secid",
                    column = @Column(name = "secid")),
            @AttributeOverride(name = "tradedate",
                    column = @Column(name = "tradedate"))
    })

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
