package moex.com.totsystems.util.xml;

import lombok.extern.slf4j.Slf4j;
import moex.com.totsystems.entity.Security;
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
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class XMLstaxSecurityParser {

    public List<Security> parseXMLfile(String fileName) {
        List<Security> securities = new ArrayList<>();
        Security security = null;
        boolean dataAvailable = true;
        XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
        try {
            XMLEventReader reader = xmlInputFactory.createXMLEventReader(new FileInputStream(fileName));
            while (reader.hasNext()) {
                XMLEvent xmlEvent = reader.nextEvent();
                if (xmlEvent.isStartElement()) {
                    StartElement startElement = xmlEvent.asStartElement();
                    security = getSecurity(startElement);
                }
                if (xmlEvent.isEndElement()) {
                    EndElement endElement = xmlEvent.asEndElement();
                    if (endElement.getName().getLocalPart().equals("row") && dataAvailable) {
                        securities.add(security);
                    }
                }

                if (xmlEvent.isEndElement()) {
                    EndElement endElement = xmlEvent.asEndElement();
                    if (endElement.getName().getLocalPart().equals("data")) {
                        dataAvailable = false;
                    }
                }
            }

        } catch (FileNotFoundException | XMLStreamException exc) {
            exc.printStackTrace();
        }
        return securities;
    }

    private Security getSecurity(StartElement startElement) {
        Security security = new Security();
        if (startElement.getName().getLocalPart().equals("row")) {
            Attribute secid = startElement.getAttributeByName(new QName("secid"));
            if (secid != null) {
                security.setSecid(secid.getValue());
            }

            Attribute shortname = startElement.getAttributeByName(new QName("shortname"));
            if (shortname != null) {
                security.setShortname(shortname.getValue());
            }

            Attribute regnumber = startElement.getAttributeByName(new QName("regnumber"));
            if (regnumber != null) {
                security.setRegnumber(regnumber.getValue());
            }

            Attribute name = startElement.getAttributeByName(new QName("name"));
            if (name != null) {
                security.setName(name.getValue());
            }

            Attribute isTraded = startElement.getAttributeByName(new QName("is_traded"));
            if (isTraded != null) {
                security.setTraded(isTraded.getValue().equals("1"));
            }

            Attribute emitentTitle = startElement.getAttributeByName(new QName("emitent_title"));
            if (emitentTitle != null) {
                security.setEmitentTitle(emitentTitle.getValue());
            }
        }

        return security;
    }
}
