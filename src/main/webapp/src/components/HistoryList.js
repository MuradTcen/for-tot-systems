import React, {Component} from "react";

import {Button, ButtonGroup, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare, faEdit, faList, faSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {MyToast} from "./MyToast";
import {Link} from "react-router-dom";

export class HistoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            histories: []
        };
    }

    componentDidMount() {
        this.findAllHistories();
    }

    findAllHistories() {
        const data = {
            "ascending": true,
            "desiredContent": "",
            "filterField": "EMITENT_TITLE",
            "page": 0,
            "size": 5,
            "sortField": "EMITENT_TITLE"
        };

        axios.post("http://localhost:8080/api/history/custom-with-filter-and-sort", data)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({histories: data.content})
            });
    }

    deleteHistory = (historySecid, date) => {
        axios.delete("http://localhost:8080/api/history/" + historySecid + "/" + date)
            .then((response) => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);

                    this.setState({
                        histories: this.state.histories.filter(history => !(history.secid === historySecid && history.tradedate === date))
                    })
                } else {
                    this.setState({"show": false});
                }
            });
    };

    render() {
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"History Deleted Successfully."} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Histories</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Secid</th>
                                <th>Regnumber</th>
                                <th>Name</th>
                                <th>Emitent Title</th>
                                <th>Tradedate</th>
                                <th>Numtrades</th>
                                <th>Open</th>
                                <th>Close</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.histories.length === 0 ?
                                <tr align="center">
                                    <td colSpan="9"> Histories Available</td>
                                </tr> :
                                this.state.histories.map((history) => (
                                    <tr key={history.secid}>
                                        <td>{history.secid}</td>
                                        <td>{history.regnumber}</td>
                                        <td>{history.name}</td>
                                        <td>{history.emitentTitle}</td>
                                        <td>{history.tradedate}</td>
                                        <td>{history.numtrades}</td>
                                        <td>{history.open}</td>
                                        <td>{history.close}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit-history/" + history.secid + "/" + history.tradedate}
                                                      className="btn btn-sm btn-outline-primary"><FontAwesomeIcon
                                                    icon={faEdit}/></Link>{' '}
                                                <Button size="sm" variant="outline-danger"
                                                        onClick={this.deleteHistory.bind(this, history.secid, history.tradedate)}>
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </Button>{' '}
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
