package moex.com.totsystems.service;

import moex.com.totsystems.dto.SecurityDto;
import moex.com.totsystems.entity.Security;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface SecurityService {
    Page<Security> getAll(Pageable pageable);

    Security addSecurity(Security security);

    Optional<Security> getBySecid(String secid);

    Optional<Security> update(SecurityDto securityDto);

    void delete(String secid);

    void importByXml(String file);
}
