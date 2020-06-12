package moex.com.totsystems.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moex.com.totsystems.dto.SecurityDto;
import moex.com.totsystems.entity.Security;
import moex.com.totsystems.service.FileStorageService;
import moex.com.totsystems.service.SecurityService;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/security/")
@Slf4j
@Validated
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://tot-systems.herokuapp.com/"})
public class SecurityController {

    private final SecurityService securityService;
    private final FileStorageService fileStorageService;

    @ApiOperation(value = "Получить список ценных бумаг")
    @GetMapping
    public List<Security> list() {
        return securityService.getAll();
    }

    @ApiOperation(value = "Получить данные ценной бумаги")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(value = "{secid}")
    public Security one(@PathVariable String secid, HttpServletResponse response) {
        return securityService.getBySecid(secid)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Security Not Found"));
    }

    @ApiOperation(value = "Создать ценную бумагу")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Security addSecurity(@RequestBody @Valid SecurityDto securityDto) {
        Security security = Security.ofSecurityDto(securityDto);

        return securityService.addSecurity(security);
    }

    @ApiOperation(value = "Обновить данные ценной бумаги")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping
    Security update(@RequestBody @Valid SecurityDto securityDto) {
        return securityService.update(securityDto).get();
    }

    @ApiOperation(value = "Удалить ценную бумагу")
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping(value = "{secid}")
    public void delete(@PathVariable String secid) {
        securityService.delete(secid);
    }

    @ApiOperation(value = "Загрузить ценные бумаги из XML-файла")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(value = "import")
    public void importByXml(@RequestParam("file") MultipartFile file) {
        //todo: проверку на тип файла и сделать проперти
        String filename = fileStorageService.storeFile(file);
        securityService.importByXml("upload/" + filename);
    }

    @ApiOperation(value = "Загрузить ценные бумаги из XML-файлов")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(value = "multiple-import")
    public void importByMulipleXml(@RequestParam("files") MultipartFile[] files) {
        //todo: проверить в корректности работы (либо swagger не работает как надо, либо роут)
        Arrays.stream(files).forEach(file -> importByXml(file));
    }
}
