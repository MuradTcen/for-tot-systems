package moex.com.totsystems.entity;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Data
public class Trade implements Serializable {
    private String secid;
    private LocalDate tradedate;
}
