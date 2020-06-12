import React, {Component} from "react";

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {MyToast} from './MyToast';

export class History extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = this.initialState;
    //     this.state = {
    //         show: false
    //     };
    //     this.historyChange = this.historyChange.bind(this);
    //     this.submitHistory = this.submitHistory.bind(this);
    // }
    //
    // initialState = {
    //     secid: '', shortname: '', regnumber: '', name: '', emitentTitle: '', isTraded: false
    // };
    //
    // componentDidMount() {
    //     const historySecid = this.props.match.params.secid;
    //     const historyDate = this.props.match.params.date;
    //     if (historySecid && historyDate) {
    //         this.findHistoryBySecidAndDate(historySecid, historyDate);
    //     }
    // }
    //
    // findHistoryBySecidAndDate = (historySecid, date) => {
    //     axios.get("http://localhost:8080/api/history/" + historySecid + "/" + date)
    //         .then(response => {
    //             if (response.data != null) {
    //                 this.setState({
    //                     secid: response.data.secid,
    //                     shortname: response.data.shortname,
    //                     regnumber: response.data.regnumber,
    //                     name: response.data.name,
    //                     emitentTitle: response.data.emitentTitle,
    //                     isTraded: response.data.isTraded ? "on" : "false",
    //                 })
    //             }
    //         }).catch((error) => {
    //         console.error("Error - " + error)
    //     });
    // };
    //
    // resetHistory = () => {
    //     this.setState(() => this.initialState);
    // };
    //
    // submitHistory = event => {
    //     event.preventDefault();
    //
    //     const history = {
    //         secid: this.state.secid,
    //         shortname: this.state.shortname,
    //         regnumber: this.state.regnumber,
    //         name: this.state.name,
    //         emitentTitle: this.state.emitentTitle,
    //         isTraded: this.state.isTraded
    //     };
    //
    //     axios.post("http://localhost:8080/api/history/", history)
    //         .then(response => {
    //             if (response.data != null) {
    //                 this.setState({"show": true, "method": "post"});
    //                 setTimeout(() => this.setState({"show": false}), 3000);
    //                 setTimeout(() => this.securities(), 3000);
    //             } else {
    //                 this.setState({"show": false});
    //             }
    //         });
    //
    //     this.setState(this.initialState);
    // };
    //
    // updateSecurity = event => {
    //     event.preventDefault();
    //
    //     const security = {
    //         secid: this.state.secid,
    //         shortname: this.state.shortname,
    //         regnumber: this.state.regnumber,
    //         name: this.state.name,
    //         emitentTitle: this.state.emitentTitle,
    //         isTraded: this.state.isTraded
    //     };
    //
    //     axios.put("http://localhost:8080/api/history/", security)
    //         .then(response => {
    //             if (response.data != null) {
    //                 this.setState({"show": true, "method": "put"});
    //                 setTimeout(() => this.setState({"show": false}), 3000);
    //             } else {
    //                 this.setState({"show": false});
    //             }
    //         });
    //
    //     this.setState(this.initialState);
    // };
    //
    // historyChange = event => {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    // };
    //
    // onChangeCheck = () => {
    //     this.setState(initialState => ({
    //         isTraded: !initialState.isTraded,
    //     }));
    // };
    //
    // securities = () => {
    //     return this.props.history.push("/list");
    // };

    render() {
        // const {secid, name, shortname, regnumber, emitentTitle, isTraded} = this.state;
        return (
            <div>
                {/*<div style={{"display": this.state.show ? "block" : "none"}}>*/}
                {/*    <MyToast show={this.state.show}*/}
                {/*             message={this.state.method === "put" ? "Security Updated Successfully." : "Security Saved Successfully."}*/}
                {/*             type={"success"}/>*/}
                {/*</div>*/}
                {/*<Card className={"border border-dark bg-dark text-white"}>*/}
                {/*    <Card.Header><FontAwesomeIcon icon={this.state.secid ? faEdit : faPlusSquare}/>{this.state.secid ? " Update Security" : " Add New Security"}</Card.Header>*/}
                {/*    <Form onReset={this.resetHistory} onSubmit={this.props.match.params.id? this.updateSecurity : this.submitHistory} id="securityFormId">*/}
                {/*        <Card.Body>*/}
                {/*            <Form.Row>*/}
                {/*                <Form.Group as={Col} controlId="formGridSecid">*/}
                {/*                    <Form.Label>Secid</Form.Label>*/}
                {/*                    <Form.Control required autoComplete="off" readOnly={this.props.match.params.id}*/}
                {/*                                  type="text" name="secid"*/}
                {/*                                  value={secid} onChange={this.historyChange}*/}
                {/*                                  className={"bg-dark text-white"}*/}
                {/*                                  placeholder="Enter secid"/>*/}
                {/*                </Form.Group>*/}
                {/*                <Form.Group as={Col} controlId="formGridShortname">*/}
                {/*                    <Form.Label>Shortname</Form.Label>*/}
                {/*                    <Form.Control required autoComplete="off"*/}
                {/*                                  type="text" name="shortname"*/}
                {/*                                  value={shortname}*/}
                {/*                                  onChange={this.historyChange}*/}
                {/*                                  className={"bg-dark text-white"}*/}
                {/*                                  placeholder="Enter shortname"/>*/}
                {/*                </Form.Group>*/}
                {/*            </Form.Row>*/}
                {/*            <Form.Row>*/}
                {/*                <Form.Group as={Col} controlId="formGridRegnumber">*/}
                {/*                    <Form.Label>Regnumber</Form.Label>*/}
                {/*                    <Form.Control required autoComplete="off"*/}
                {/*                                  type="text" name="regnumber"*/}
                {/*                                  value={regnumber} onChange={this.historyChange}*/}
                {/*                                  className={"bg-dark text-white"}*/}
                {/*                                  placeholder="Enter regnumber"/>*/}
                {/*                </Form.Group>*/}
                {/*                <Form.Group as={Col} controlId="formGridname">*/}
                {/*                    <Form.Label>Name</Form.Label>*/}
                {/*                    <Form.Control required autoComplete="off"*/}
                {/*                                  type="text" name="name"*/}
                {/*                                  value={name} onChange={this.historyChange}*/}
                {/*                                  className={"bg-dark text-white"}*/}
                {/*                                  placeholder="Enter name"/>*/}
                {/*                </Form.Group>*/}
                {/*            </Form.Row>*/}
                {/*            <Form.Row>*/}
                {/*                <Form.Group as={Col} controlId="formGridEmitentTitle">*/}
                {/*                    <Form.Label>Emitent Title</Form.Label>*/}
                {/*                    <Form.Control required autoComplete="off"*/}
                {/*                                  type="text" name="emitentTitle"*/}
                {/*                                  value={emitentTitle} onChange={this.historyChange}*/}
                {/*                                  className={"bg-dark text-white"}*/}
                {/*                                  placeholder="Enter emitentTitle"/>*/}
                {/*                </Form.Group>*/}
                {/*            </Form.Row>*/}
                {/*            <Form.Group controlId="formGridIsTraded">*/}
                {/*                <Form.Check type="checkbox" name="isTraded"*/}
                {/*                            checked={isTraded} onChange={this.onChangeCheck}*/}
                {/*                            label="Is Traded"/>*/}
                {/*            </Form.Group>*/}
                {/*        </Card.Body>*/}
                {/*        <Card.Footer style={{"textAlign": "right"}}>*/}
                {/*            <Button size="sm" variant="success" type="submit">*/}
                {/*                <FontAwesomeIcon icon={faSave}/> {this.props.match.params.id ? "Update" : "Save"}*/}
                {/*            </Button>{' '}*/}
                {/*            <Button size="sm" variant="info" type="reset">*/}
                {/*                <FontAwesomeIcon icon={faUndo}/> Reset*/}
                {/*            </Button>{' '}*/}
                {/*            <Button size="sm" variant="info" type="button" onClick={this.securities.bind()}>*/}
                {/*                <FontAwesomeIcon icon={faList}/> Securities*/}
                {/*            </Button>*/}
                {/*        </Card.Footer>*/}
                {/*    </Form>*/}
                {/*</Card>*/}
            </div>
        );
    }
}