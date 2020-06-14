package moex.com.totsystems.service;

public interface MoexService {
    void downloadSecurityFile(String secid);

    String downloadHistoryFile(String date);
}
