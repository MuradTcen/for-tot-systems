package moex.com.totsystems.service.impl;

import lombok.extern.slf4j.Slf4j;
import moex.com.totsystems.exception.FileStorageException;
import moex.com.totsystems.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@Slf4j
public class FileStorageServiceImpl implements FileStorageService {

    private Path fileStorageLocation;

    @Autowired
    public FileStorageServiceImpl() {
        //todo сделать property
        fileStorageLocation = Paths.get("upload").toAbsolutePath().normalize();

        try {
            Files.createDirectories(fileStorageLocation);
            log.info("${directory}");
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @Override
    public String storeFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        log.info(fileName);

        try {
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            Path targetLocation = fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }
}
