package moex.com.totsystems.repository;

import moex.com.totsystems.entity.Security;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SecurityRepository extends JpaRepository<Security, String> {
    Optional<Security> findFirstBySecid(String secid);
}
