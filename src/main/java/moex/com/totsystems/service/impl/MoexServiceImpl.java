package moex.com.totsystems.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import moex.com.totsystems.service.MoexService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.net.URL;

@Slf4j
@RequiredArgsConstructor
@Service
public class MoexServiceImpl implements MoexService {

    @Value(value = "${moex.api.url}")
    private String securityUrl;

    @Value(value = "${upload.directory}")
    private String directory;

    @Value(value = "${moex.history.api.url}")
    private String historyUrl;

    @Override
    public void downloadSecurityFile(String secid) {
        log.info("Start downloading securities.xml by secid: " + secid);

        try {
            FileUtils.copyURLToFile(new URL(securityUrl + secid), new File(directory + secid + ".xml"));
        } catch (IOException e) {
            log.error("Exception during downloading security.xml: " + e.getMessage());
        }
    }

    @Override
    public String downloadHistoryFile(String date) {
        log.info("Start downloading histories.xml by date: " + date);
        String filename = "histories_" +date + ".xml";
        try {
            FileUtils.copyURLToFile(new URL(historyUrl + date), new File(directory + filename));
        } catch (IOException e) {
            log.error("Exception during downloading security.xml: " + e.getMessage());
        }

        return filename;
    }
}
