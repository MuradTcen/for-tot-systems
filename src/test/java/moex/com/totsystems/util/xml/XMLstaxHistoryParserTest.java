package moex.com.totsystems.util.xml;

import moex.com.totsystems.dto.HistoryDto;
import moex.com.totsystems.entity.History;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@DirtiesContext
class XMLstaxHistoryParserTest {

    @Autowired
    private XMLstaxHistoryParser parser;

    private String filename = "src/test/java/moex/com/totsystems/util/xml/historiesForTest.xml";

    @Test
    void parseXMLfile_whenGetXml_thenGetHistories() {
        HistoryDto firstHistoryDto = new HistoryDto("ABRD", LocalDate.parse("2020-06-11"),
                60., 299220., 129.5, 129.5, 130.5, 130.5, 2300.);

        HistoryDto secondHistoryDto = new HistoryDto("ACKO", LocalDate.parse("2020-06-11"),
                138, 240662., 5.12, 5.02, 5.12, 5.08, 47600);

        List<History> expected = Arrays.asList(History.ofHistoryDto(firstHistoryDto), History.ofHistoryDto(secondHistoryDto));

        List<History> actual = parser.parseXMLfile(filename);

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void parseXMLfile_whenGetXml_thenGetHistoriesFailed() {
        HistoryDto firstHistoryDto = new HistoryDto("ABRD", LocalDate.parse("2020-06-11"),
                60., 299220., 129.5, 129.5, 130.5, 130.5, 2300.);

        List<History> expected = Arrays.asList(History.ofHistoryDto(firstHistoryDto));

        List<History> actual = parser.parseXMLfile(filename);

        assertThat(actual).isNotEqualTo(expected);
    }
}