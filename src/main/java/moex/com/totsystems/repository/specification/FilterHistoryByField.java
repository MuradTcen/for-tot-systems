package moex.com.totsystems.repository.specification;

import lombok.extern.slf4j.Slf4j;
import moex.com.totsystems.entity.History;
import moex.com.totsystems.entity.Security;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;

@Slf4j
public class FilterHistoryByField implements Specification<History> {
    private String desiredContent;
    private String field;

    public FilterHistoryByField(String desiredContent, String field) {
        this.desiredContent = "%" + desiredContent.toLowerCase() + "%";
        this.field = field;
    }

    @Override
    public Predicate toPredicate(Root<History> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        if (desiredContent.equals("%%")) return null;
        Join<History, Security> join = root.join("security", JoinType.INNER);

        return cb.like(cb.lower(join.get(field)), desiredContent);
    }
}
