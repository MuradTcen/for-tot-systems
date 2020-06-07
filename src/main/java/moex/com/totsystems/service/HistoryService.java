package moex.com.totsystems.service;

import moex.com.totsystems.dto.HistoryDto;
import moex.com.totsystems.entity.History;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HistoryService {
    List<History> getAll();
    
    List<History> getAllByDate(LocalDate date);

    List<History> getAllBySecid(String secid);

    History addHistory(History history);

    Optional<History> update(HistoryDto historyDto);

    void deleteByDateAndSecid(LocalDate parse, String secid);

    void importByXml(String s);
}
