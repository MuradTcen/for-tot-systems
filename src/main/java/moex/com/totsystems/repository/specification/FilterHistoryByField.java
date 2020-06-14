package moex.com.totsystems.repository.specification;

import moex.com.totsystems.dto.enums.FilterField;
import moex.com.totsystems.entity.History;
import moex.com.totsystems.entity.Security;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.time.LocalDate;

public class FilterHistoryByField implements Specification<History> {
    private String desiredContent;
    private String field;

    public FilterHistoryByField(String desiredContent, String field) {
        this.desiredContent = desiredContent;
        this.field = field;
    }

    @Override
    public Predicate toPredicate(Root<History> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        if (desiredContent.equals("")) return null;

        if (field.equals(FilterField.EMITENT_TITLE.getName())) {
            desiredContent = "%" + desiredContent.toLowerCase() + "%";
            Join<History, Security> join = root.join("security", JoinType.INNER);

            return cb.like(cb.lower(join.get(field)), desiredContent);
        } else {
            return cb.equal(root.get(field), LocalDate.parse(desiredContent));
        }
    }
}
