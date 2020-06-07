package moex.com.totsystems.service;

import moex.com.totsystems.dto.SecurityDto;
import moex.com.totsystems.entity.Security;

import java.util.List;
import java.util.Optional;

public interface SecurityService {
    List<Security> getAll();

    Security addSecurity(Security security);

    Optional<Security> getBySecid(String secid);

    Optional<Security> update(SecurityDto securityDto);

    void delete(String secid);

    void importByXml(String file);
}
