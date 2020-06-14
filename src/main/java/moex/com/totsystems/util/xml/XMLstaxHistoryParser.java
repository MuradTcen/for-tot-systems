package moex.com.totsystems.util.xml;

import lombok.extern.slf4j.Slf4j;
import moex.com.totsystems.entity.History;
import org.springframework.stereotype.Component;

import javax.xml.namespace.QName;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Attribute;
import javax.xml.stream.events.EndElement;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class XMLstaxHistoryParser {

    public List<History> parseXMLfile(String fileName) {
        List<History> histories = new ArrayList<>();
        History history = null;
        boolean dataAvailable = true;
        XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
        try {
            log.info("Filename for parsing: " + fileName);
            XMLEventReader reader = xmlInputFactory.createXMLEventReader(new FileInputStream(fileName));
            while (reader.hasNext()) {
                XMLEvent xmlEvent = reader.nextEvent();
                if (xmlEvent.isStartElement()) {
                    StartElement startElement = xmlEvent.asStartElement();
                    history = getHistory(startElement);
                }

                if (xmlEvent.isEndElement()) {
                    EndElement endElement = xmlEvent.asEndElement();
                    if (endElement.getName().getLocalPart().equals("row") && dataAvailable) {
                        histories.add(history);
                    }
                }

                if (xmlEvent.isEndElement()) {
                    EndElement endElement = xmlEvent.asEndElement();
                    if (endElement.getName().getLocalPart().equals("data")) {
                        dataAvailable = false;
                    }
                }
            }

        } catch (FileNotFoundException | XMLStreamException e) {
            log.error("Error during parsing {}", e.getMessage());
        }

        return histories;
    }

    private History getHistory(StartElement startElement) {
        History history = new History();
        if (startElement.getName().getLocalPart().equals("row")) {
            Attribute secid = startElement.getAttributeByName(new QName("SECID"));
            if (secid != null) {
                history.setSecid(secid.getValue());
            }

            Attribute tradedate = startElement.getAttributeByName(new QName("TRADEDATE"));
            if (tradedate != null) {
                history.setTradedate(LocalDate.parse(tradedate.getValue()));
            }

            Attribute numtrades = startElement.getAttributeByName(new QName("NUMTRADES"));
            if (numtrades != null && !numtrades.getValue().isEmpty()) {
                history.setNumtrades(Double.parseDouble(numtrades.getValue()));
            }

            Attribute value = startElement.getAttributeByName(new QName("VALUE"));
            if (value != null && !value.getValue().isEmpty()) {
                history.setValue(Double.parseDouble(value.getValue()));
            }

            Attribute open = startElement.getAttributeByName(new QName("OPEN"));
            if (open != null && !open.getValue().isEmpty()) {
                history.setOpen(Double.parseDouble(open.getValue()));
            }

            Attribute low = startElement.getAttributeByName(new QName("LOW"));
            if (low != null && !low.getValue().isEmpty()) {
                history.setLow(Double.parseDouble(low.getValue()));
            }

            Attribute high = startElement.getAttributeByName(new QName("HIGH"));
            if (high != null && !high.getValue().isEmpty()) {
                history.setHigh(Double.parseDouble(high.getValue()));
            }

            Attribute close = startElement.getAttributeByName(new QName("CLOSE"));
            if (close != null && !close.getValue().isEmpty()) {
                history.setClose(Double.parseDouble(close.getValue()));
            }

            Attribute volume = startElement.getAttributeByName(new QName("VOLUME"));
            if (volume != null && !volume.getValue().isEmpty()) {
                history.setVolume(Double.parseDouble(volume.getValue()));
            }
        }

        return history;
    }
}
