import React, {Component} from "react";

import {Button, ButtonGroup, Card, FormControl, InputGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckSquare,
    faEdit,
    faFastBackward, faFastForward,
    faList,
    faSquare,
    faStepBackward, faStepForward,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {MyToast} from "./MyToast";
import {Link} from "react-router-dom";

export class SecurityList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            securities: [],
            currentPage: 1,
            securitiesPerPage: 5,
            totalElements: 0
        };
    }

    componentDidMount() {
        this.findAllSecurities(this.state.currentPage);
    }

    findAllSecurities(currentPage) {
        currentPage -= 1;

        axios.get("http://localhost:8080/api/security?page=" + currentPage + "&size=" + this.state.securitiesPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    securities: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                })
            });
    }

    deleteSecurity = (securitySecid) => {
        axios.delete("http://localhost:8080/api/security/" + securitySecid)
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

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        this.findAllSecurities(targetPage);
        this.state({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllSecurities(firstPage);
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.findAllSecurities(this.state.currentPage - prevPage);
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.securitiesPerPage);
        if (this.state.currentPage < condition) {
            this.findAllSecurities(condition);
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.securitiesPerPage)) {
            this.findAllSecurities(this.state.currentPage + 1);
        }
    };

    render() {
        const {securities, currentPage, totalPages} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"Security Deleted Successfully."} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Securities</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark" size="sm">
                            <thead>
                            <tr>
                                <th>Secid</th>
                                <th>Shortname</th>
                                <th>Regnumber</th>
                                <th>Name</th>
                                <th>Is Traded</th>
                                <th>Emitent Title</th>
                                <th>Actions</th>
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
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit-security/" + security.secid}
                                                      className="btn btn-sm btn-outline-primary"><FontAwesomeIcon
                                                    icon={faEdit}/></Link>{' '}
                                                <Button size="sm" variant="outline-danger"
                                                        onClick={this.deleteSecurity.bind(this, security.secid)}>
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
                    {securities.length > 0 ?
                        <Card.Footer>
                            <div style={{"float": "left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float": "right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward}/> First
                                        </Button>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward}/> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl className={"page-num bg-dark"} name="currentPage" value={currentPage}
                                                 onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward}/> Next
                                        </Button>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward}/> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer> : null
                    }
                </Card>
            </div>
        );
    }
}
