import React, {Component} from "react";

import {Button, ButtonGroup, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare, faEdit, faList, faSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {MyToast} from "./MyToast";
import {Link} from "react-router-dom";

export class SecurityList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            securities: []
        };
    }

    componentDidMount() {
        this.findAllSecurities();
    }

    findAllSecurities() {
        axios.get("http://localhost:8088/api/security/")
            .then(response => response.data)
            .then((data) => {
                this.setState({securities: data})
            });
    }

    deleteSecurity = (securitySecid) => {
        axios.delete("http://localhost:8088/api/security/" + securitySecid)
            .then((response) => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    this.setState({
                        securities: this.state.securities.filter(security => security.secid !== securitySecid)
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
                    <MyToast show={this.state.show} message={"Security Deleted Successfully."} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Securities</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Secid</th>
                                <th>Shortname</th>
                                <th>Regnumber</th>
                                <th>Name</th>
                                <th>Is Traded</th>
                                <th>Emitent Title</th>
                                <th>Actions</th>

                                {/*<th>Secid</th>*/}
                                {/*<th>Regnumber</th>*/}
                                {/*<th>Name</th>*/}
                                {/*<th>Emitent Title</th>*/}
                                {/*<th>Tradedate</th>*/}
                                {/*<th>Numtrades</th>*/}
                                {/*<th>Open</th>*/}
                                {/*<th>Close</th>*/}
                                {/*<th>Actions</th>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.securities.length === 0 ?
                                <tr align="center">
                                    <td colSpan="9"> Securities Available</td>
                                </tr> :
                                this.state.securities.map((security) => (
                                    <tr key={security.secid}>
                                        <td>{security.secid}</td>
                                        <td>{security.shortname}</td>
                                        <td>{security.regnumber}</td>
                                        <td>{security.name}</td>
                                        <td>{security.traded ? <FontAwesomeIcon icon={faCheckSquare}/> :
                                            <FontAwesomeIcon icon={faSquare}/>}</td>
                                        <td>{security.emitentTitle}</td>

                                        {/*<td>{security.secid}</td>*/}
                                        {/*<td>{security.regnumber}</td>*/}
                                        {/*<td>{security.name}</td>*/}
                                        {/*<td>{security.emitentTitle}</td>*/}
                                        {/*<td>{security.tradedate}</td>*/}
                                        {/*<td>{security.numtrades}</td>*/}
                                        {/*<td>{security.open}</td>*/}
                                        {/*<td>{security.close}</td>*/}
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/" + security.secid} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteSecurity.bind(this, security.secid)}>
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
