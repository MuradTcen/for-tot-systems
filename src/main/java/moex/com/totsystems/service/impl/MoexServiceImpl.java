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
    private String url;

    @Value(value = "${upload.directory}")
    private String directory;

    @Override
    public void downloadFile(String secid) {
        log.info("Start downloading " + secid + ".xml");

        try {
            FileUtils.copyURLToFile(new URL(url + "/" + secid), new File(directory + secid + ".xml"));
        } catch (IOException e) {
            log.error("Exception during downloading security.xml: " + e.getMessage());
        }
    }
}
