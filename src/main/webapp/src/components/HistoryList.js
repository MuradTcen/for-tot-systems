import React, {Component} from "react";

import {Button, ButtonGroup, Card, FormControl, InputGroup, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faFastBackward,
    faFastForward,
    faList,
    faSearch,
    faSort,
    faStepBackward,
    faStepForward,
    faTimes,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {MyToast} from "./MyToast";
import {Link} from "react-router-dom";
import './Style.css';

export class HistoryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            histories: [],
            search: '',
            currentPage: 1,
            filterField: 'EMITENT_TITLE',
            sortField: 'EMITENT_TITLE',
            historiesPerPage: 2,
            sortToggle: true
        };
    }

    sortDataByTradedate = () => {
        let field = 'TRADEDATE';
        this.setState(state => ({
            sortField: field
        }));
        this.sortData(field);
    };

    sortDataByEmitentTitle = () => {
        let field = 'EMITENT_TITLE';
        this.setState(state => ({
            sortField: field
        }));
        this.sortData(field);
    };

    sortData = (field) => {
        this.setState(state => ({
            sortToggle: !state.sortToggle
        }));
        this.findAllHistories(this.state.currentPage, field);
    };

    componentDidMount() {
        this.findAllHistories(this.state.currentPage);
    }

    findAllHistories(currentPage, sortField) {
        currentPage -= 1;

        const data = {
            "ascending": this.state.sortToggle,
            "desiredContent": "",
            "filterField": this.state.filterField,
            "page": currentPage,
            "size": this.state.historiesPerPage,
            "sortField": sortField ? sortField : this.state.sortField
        };

        axios.post("http://localhost:8080/api/history/custom-with-filter-and-sort", data)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    histories: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                })
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

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if (this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllHistories(targetPage);
        }
        this.state({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            if (this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllHistories(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            if (this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllHistories(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.historiesPerPage);
        if (this.state.currentPage < condition) {
            if (this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllHistories(condition);
            }
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.historiesPerPage)) {
            if (this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllHistories(this.state.currentPage + 1);
            }
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    cancelSearch = event => {
        this.setState({'search': ''});
        this.findAllHistories(this.state.currentPage);
    };

    searchDataEmitentTitle = currentPage => {
        let field = 'EMITENT_TITLE';
        this.setState({
            filterField: field,
        });
        this.searchData(currentPage, field);
    };

    searchDataTradedate = currentPage => {
        let field = 'TRADEDATE';
        this.setState({
            filterField: field,
        });
        this.searchData(currentPage, field);
    };

    searchData = (currentPage, filterField) => {
        currentPage -= 1;

        const data = {
            "ascending": this.state.sortToggle,
            "desiredContent": this.state.search,
            "filterField": filterField ? filterField : this.state.filterField,
            "page": currentPage,
            "size": this.state.historiesPerPage,
            "sortField": "EMITENT_TITLE"
        };

        axios.post("http://localhost:8080/api/history/custom-with-filter-and-sort", data)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    histories: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                })
            });
    };

    render() {
        const {histories, currentPage, totalPages, search} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"History Deleted Successfully."} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{"float": "left"}}><FontAwesomeIcon icon={faList}/> Histories</div>
                        <div style={{"float": "right"}}>
                            <InputGroup size="sm">
                                <Button size="sm" variant="outline-info" type="button"
                                        onClick={this.sortDataByEmitentTitle}>
                                    <FontAwesomeIcon icon={faSort}/> Sort By Emitent Title
                                </Button>
                                <Button size="sm" variant="outline-info" type="button"
                                        onClick={this.sortDataByTradedate}>
                                    <FontAwesomeIcon icon={faSort}/> Sort By Tradedate
                                </Button>
                                <FormControl placeholder="Search" name="search" value={search}
                                             className={"bg-dark text-white"}
                                             onChange={this.searchChange}/>
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button"
                                            onClick={this.searchDataEmitentTitle}>
                                        <FontAwesomeIcon icon={faSearch}/> Emitent Title
                                    </Button>
                                    <Button size="sm" variant="outline-info" type="button"
                                            onClick={this.searchDataTradedate}>
                                        <FontAwesomeIcon icon={faSearch}/> Tradedate
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button"
                                            onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark" size="sm">
                            <thead>
                            <tr>
                                <th>Secid</th>
                                <th>Regnumber</th>
                                <th>Name</th>
                                <th>Emitent Title
                                </th>
                                <th>Tradedate
                                </th>
                                <th>Numtrades</th>
                                <th>Open</th>
                                <th>Close</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {histories.length === 0 ?
                                <tr align="center">
                                    <td colSpan="9"> Histories Available</td>
                                </tr> :
                                histories.map((history) => (
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
                    {histories.length > 0 ?
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
