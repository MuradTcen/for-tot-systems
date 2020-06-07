package moex.com.totsystems.service.impl;

import lombok.RequiredArgsConstructor;
import moex.com.totsystems.dto.HistoryDto;
import moex.com.totsystems.entity.History;
import moex.com.totsystems.repository.HistoryRepository;
import moex.com.totsystems.service.HistoryService;
import moex.com.totsystems.util.xml.XMLstaxHistoryParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository repository;
    private final XMLstaxHistoryParser parser;

    @Override
    public List<History> getAll() {
        return repository.findAll();
    }

    @Override
    public List<History> getAllByDate(LocalDate date) {
        return repository.findAllByTradedateEquals(date);
    }

    @Override
    public List<History> getAllBySecid(String secid) {
        return repository.findAll();
    }

    @Override
    public History addHistory(History history) {
        return repository.save(history);
    }

    @Override
    public Optional<History> update(HistoryDto dto) {
        History history = repository.findByTradedateAndSecid(dto.getTradedate(), dto.getSecid())
                .orElseThrow(
                        () -> new EntityNotFoundException("History Not Found")
                );

        Optional.ofNullable(dto.getClose()).ifPresent(history::setClose);
        Optional.ofNullable(dto.getHigh()).ifPresent(history::setHigh);
        Optional.ofNullable(dto.getLow()).ifPresent(history::setLow);
        Optional.ofNullable(dto.getNumtrades()).ifPresent(history::setNumtrades);
        Optional.ofNullable(dto.getOpen()).ifPresent(history::setOpen);
        Optional.ofNullable(dto.getValue()).ifPresent(history::setValue);
        Optional.ofNullable(dto.getVolume()).ifPresent(history::setVolume);

        return Optional.of(history);
    }

    @Override
    public void deleteByDateAndSecid(LocalDate date, String secid) {
        repository.findByTradedateAndSecid(date, secid).orElseThrow(
                () -> new EntityNotFoundException(String.format("History by date: {} and secid: {} Not Found", date, secid))
        );

        repository.deleteByTradedateAndSecid(date, secid);
    }

    @Override
    public void importByXml(String file) {
        List<History> histories = parser.parseXMLfile(file);
        histories.forEach(history -> addHistory(history));
    }
}
