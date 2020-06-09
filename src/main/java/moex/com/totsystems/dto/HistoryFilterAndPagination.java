package moex.com.totsystems.dto;

import lombok.Data;
import moex.com.totsystems.dto.enums.FilterField;
import moex.com.totsystems.dto.enums.SortField;

@Data
public class HistoryFilterAndPagination {

    private FilterField filterField = FilterField.EMITENT_TITLE;
    private String desiredContent = "";
    private SortField sortField = SortField.TRADEDATE;
    private int page = 0;
    private int size = 20;
    private boolean ascending = true;
}
