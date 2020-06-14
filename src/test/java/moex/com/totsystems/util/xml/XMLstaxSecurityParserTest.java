package moex.com.totsystems.util.xml;

import moex.com.totsystems.dto.SecurityDto;
import moex.com.totsystems.entity.Security;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@DirtiesContext
class XMLstaxSecurityParserTest {

    @Autowired
    private XMLstaxSecurityParser parser;

    private String filename = "src/test/java/moex/com/totsystems/util/xml/securitiesForTest.xml";

    @Test
    void parseXMLfile_whenGetXml_thenGetSecurities() {
        SecurityDto firstSecurityDto = new SecurityDto("AAPL", "Apple", "", "Apple Inc.",
                true,"Apple Inc");

        SecurityDto secondSecurityDto = new SecurityDto("ABRD", "АбрауДюрсо", "1-02-12500-A",
                "Абрау-Дюрсо ПАО ао", true, "Публичное акционерное общество \"Абрау – Дюрсо\"");

        List<Security> expected = Arrays.asList(Security.ofSecurityDto(firstSecurityDto), Security.ofSecurityDto(secondSecurityDto));

        List<Security> actual = parser.parseXMLfile(filename);

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void parseXMLfile_whenGetXml_thenGetSecuritiesFailed() {
        SecurityDto firstSecurityDto = new SecurityDto("AAPL", "Apple", "", "Apple Inc.",
                true,"Apple Inc");

        List<Security> expected = Arrays.asList(Security.ofSecurityDto(firstSecurityDto));

        List<Security> actual = parser.parseXMLfile(filename);

        assertThat(actual).isNotEqualTo(expected);
    }
}