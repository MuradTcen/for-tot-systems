package moex.com.totsystems.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moex.com.totsystems.dto.HistoryDto;
import moex.com.totsystems.entity.History;
import moex.com.totsystems.service.FileStorageService;
import moex.com.totsystems.service.HistoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/history/")
@Slf4j
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;
    private final FileStorageService fileStorageService;

    @ApiOperation(value = "Получить историю ценных бумаг по дате")
    @ResponseStatus(HttpStatus.FOUND)
    @GetMapping(value = "date/{date}")
    public List<History> listByDate(@PathVariable String date) {
        return historyService.getAllByDate(LocalDate.parse(date));
    }

    @ApiOperation(value = "Получить историю ценной бумаги по secid")
    @ResponseStatus(HttpStatus.FOUND)
    @GetMapping(value = "secid/{secid}")
    public List<History> listBySecid(@PathVariable String secid) {
        return historyService.getAllBySecid(secid);
    }

    @ApiOperation(value = "Создать историю")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public History addSecurity(@RequestBody @Valid HistoryDto historyDto) {
        History history = History.ofHistoryDto(historyDto);

        return historyService.addHistory(history);
    }

    @ApiOperation(value = "Обновить историю ценной бумаги по дню и secid")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping
    History update(@RequestBody @Valid HistoryDto historyDto) {
        return historyService.update(historyDto).get();
    }

    @ApiOperation(value = "Удалить ценную бумагу")
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(value = "{secid}/{date}")
    public void delete(@PathVariable String secid, @PathVariable String date) {
        historyService.deleteByDateAndSecid(LocalDate.parse(date), secid);
    }

    @ApiOperation(value = "Загрузить истории из XML-файла")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(value = "import")
    public void importByXml(@RequestParam("file") MultipartFile file) {
        //todo: проверку на тип файла и сделать проперти
        String filename = fileStorageService.storeFile(file);
        historyService.importByXml("upload/" + filename);
    }

    @ApiOperation(value = "Загрузить истории из XML-файлов")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(value = "multiple-import")
    public void importByMulipleXml(@RequestParam("files") MultipartFile[] files) {
        //todo: проверить в корректности работы (либо swagger не работает как надо, либо роут)
        Arrays.stream(files).forEach(file -> importByXml(file));
    }
}
