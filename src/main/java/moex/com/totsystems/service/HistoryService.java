package moex.com.totsystems.service;

import moex.com.totsystems.dto.HistoryDto;
import moex.com.totsystems.dto.HistoryFilterAndPagination;
import moex.com.totsystems.dto.SimpleHistoryDto;
import moex.com.totsystems.entity.History;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HistoryService {
    List<History> getAllByDate(LocalDate date);

    List<History> getAllBySecid(String secid);

    History addHistory(History history);

    Optional<History> update(HistoryDto historyDto);

    void deleteByDateAndSecid(LocalDate parse, String secid);

    void importByXml(String s);

    List<SimpleHistoryDto> findAllCustom();

    Page<SimpleHistoryDto> findAllCustomAnother(HistoryFilterAndPagination historyFilterAndPagination);
}
