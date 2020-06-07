package moex.com.totsystems.service.impl;

import lombok.RequiredArgsConstructor;
import moex.com.totsystems.dto.SecurityDto;
import moex.com.totsystems.entity.Security;
import moex.com.totsystems.repository.SecurityRepository;
import moex.com.totsystems.service.SecurityService;
import moex.com.totsystems.util.xml.XMLstaxSecurityParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class SecurityServiceImpl implements SecurityService {
    private final SecurityRepository repository;
    private final XMLstaxSecurityParser parser;

    @Override
    public List<Security> getAll() {
        return repository.findAll();
    }

    @Override
    public Security addSecurity(Security security) {
        return repository.save(security);
    }

    @Override
    public Optional<Security> getBySecid(String secid) {
        return repository.findById(secid);
    }

    @Override
    public Optional<Security> update(SecurityDto dto) {
        Security security = repository.findById(dto.getSecid()).orElseThrow(
                () -> new EntityNotFoundException("Security Not Found")
        );

        Optional.ofNullable(dto.getName()).ifPresent(security::setName);
        Optional.ofNullable(dto.getEmitentTitle()).ifPresent(security::setEmitentTitle);
        Optional.ofNullable(dto.getRegnumber()).ifPresent(security::setRegnumber);
        Optional.ofNullable(dto.getShortname()).ifPresent(security::setShortname);

        return Optional.of(security);
    }

    @Override
    public void delete(String secid) {
        repository.findById(secid).orElseThrow(
                () -> new EntityNotFoundException("Security Not Found")
        );

        repository.deleteById(secid);
    }

    @Override
    public void importByXml(String file) {
        List<Security> securities = parser.parseXMLfile(file);
        securities.forEach(security -> addSecurity(security));
    }

}
