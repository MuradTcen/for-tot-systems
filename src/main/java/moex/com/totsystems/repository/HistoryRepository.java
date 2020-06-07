package moex.com.totsystems.repository;

import moex.com.totsystems.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface HistoryRepository extends JpaRepository<History, String> {
    List<History> findAllByTradedateEquals(LocalDate localDate);

    List<History> findAllBySecid(String secid);

    Optional<History> findByTradedateAndSecid(LocalDate date, String secid);

    void deleteByTradedateAndSecid(LocalDate date, String secid);
}
