package moex.com.totsystems.entity;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import moex.com.totsystems.dto.SecurityDto;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity(name = "securities")
@EntityListeners(AuditingEntityListener.class)
@RequiredArgsConstructor
@Data
public class Security extends BaseEntity{

    @Id
    private String secid;
    @Column
    private String shortname;
    @Column
    private String regnumber;
    @Column
    private String name;
    @Column
    private boolean isTraded;
    @Column
    private String emitentTitle;

    // Можно использовать mapstrcuct
    public static Security ofSecurityDto(SecurityDto securityDto) {
        Security security = new Security();

        security.setName(securityDto.getName());
        security.setShortname(securityDto.getShortname());
        security.setSecid(securityDto.getSecid());
        security.setEmitentTitle(securityDto.getEmitentTitle());
        security.setTraded(securityDto.isTraded());
        security.setRegnumber(securityDto.getRegnumber());

        return security;
    }
}
