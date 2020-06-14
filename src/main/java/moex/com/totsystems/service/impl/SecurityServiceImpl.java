package moex.com.totsystems.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moex.com.totsystems.dto.SecurityDto;
import moex.com.totsystems.entity.Security;
import moex.com.totsystems.repository.SecurityRepository;
import moex.com.totsystems.service.SecurityService;
import moex.com.totsystems.util.xml.XMLstaxSecurityParser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
@Slf4j
public class SecurityServiceImpl implements SecurityService {
    private final SecurityRepository repository;
    private final XMLstaxSecurityParser parser;

    @Override
    public Page<Security> getAll(Pageable pageable) {
        return repository.findAll(pageable);
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
        log.info(String.format("Updating security with secid {}", dto.getSecid()));

        Security security = repository.findFirstBySecid(dto.getSecid()).orElseThrow(
                () -> new EntityNotFoundException("Security Not Found")
        );

        Optional.ofNullable(dto.getName()).ifPresent(security::setName);
        Optional.ofNullable(dto.getEmitentTitle()).ifPresent(security::setEmitentTitle);
        Optional.ofNullable(dto.getRegnumber()).ifPresent(security::setRegnumber);
        Optional.ofNullable(dto.getShortname()).ifPresent(security::setShortname);
        Optional.ofNullable(dto.isTraded()).ifPresent(security::setTraded);

        return Optional.of(security);
    }

    @Override
    public void delete(String secid) {
        log.info(String.format("Deleting security with secid {}", secid));

        repository.findById(secid).orElseThrow(
                () -> new EntityNotFoundException("Security Not Found")
        );

        repository.deleteById(secid);
    }

    @Override
    public void importByXml(String file) {
        log.info("Importing securities.xml");
        List<Security> securities = parser.parseXMLfile(file);
        securities.forEach(security -> addSecurity(security));
    }

}
