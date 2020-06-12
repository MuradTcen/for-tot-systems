import React, {Component} from "react";

import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {MyToast} from './MyToast';

export class History extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            show: false
        };
        this.historyChange = this.historyChange.bind(this);
        this.submitHistory = this.submitHistory.bind(this);
    }

    initialState = {
        secid: '', tradedate: '', numtrades: '', value: '', open: '', low: '', high: '', close: '', volume: '',
    };

    componentDidMount() {
        const historySecid = this.props.match.params.secid;
        const historyDate = this.props.match.params.date;
        if (historySecid && historyDate) {
            this.findHistoryBySecidAndDate(historySecid, historyDate);
        }
    }

    findHistoryBySecidAndDate = (historySecid, date) => {
        axios.get("http://localhost:8080/api/history/" + historySecid + "/" + date)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        secid: response.data.secid,
                        tradedate: response.data.tradedate,
                        numtrades: response.data.numtrades,
                        value: response.data.value,
                        open: response.data.open,
                        low: response.data.low,
                        high: response.data.high,
                        close: response.data.close,
                        volume: response.data.volume,
                    })
                }
            }).catch((error) => {
            console.error("Error - " + error)
        });
    };

    resetHistory = () => {
        this.setState(() => this.initialState);
    };

    submitHistory = event => {
        event.preventDefault();

        const history = {
            secid: this.state.secid,
            tradedate: this.state.tradedate,
            numtrades: this.state.numtrades,
            value: this.state.value,
            open: this.state.open,
            low: this.state.low,
            high: this.state.high,
            close: this.state.close,
            volume: this.state.volume,
        };

        axios.post("http://localhost:8080/api/history/", history)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, "method": "post"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    setTimeout(() => this.histories(), 3000);
                } else {
                    this.setState({"show": false});
                }
            });

        this.setState(this.initialState);
    };

    updateSecurity = event => {
        event.preventDefault();

        const security = {
            secid: this.state.secid,
            tradedate: this.state.tradedate,
            numtrades: this.state.numtrades,
            value: this.state.value,
            open: this.state.open,
            low: this.state.low,
            high: this.state.high,
            close: this.state.close,
            volume: this.state.volume,
        };

        axios.put("http://localhost:8080/api/history/", security)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, "method": "put"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false});
                }
            });

        this.setState(this.initialState);
    };

    historyChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onChangeCheck = () => {
        this.setState(initialState => ({
            isTraded: !initialState.isTraded,
        }));
    };

    histories = () => {
        return this.props.history.push("/histories");
    };

    render() {
        const {secid, tradedate, numtrades, value, open, low, high, close, volume} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show}
                             message={this.state.method === "put" ? "History Updated Successfully." : "History Saved Successfully."}
                             type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon
                        icon={this.state.secid ? faEdit : faPlusSquare}/>{this.props.match.params.secid ? " Update History" : " Add New History"}
                    </Card.Header>
                    <Form onReset={this.resetHistory}
                          onSubmit={this.props.match.params.id ? this.updateSecurity : this.submitHistory}
                          id="historyFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridSecid">
                                    <Form.Label>Secid</Form.Label>
                                    <Form.Control required autoComplete="off" readOnly={this.props.match.params.secid}
                                                  type="text" name="secid"
                                                  value={secid} onChange={this.historyChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter secid"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridTradedate">
                                    <Form.Label>Tradedate</Form.Label>
                                    <Form.Control required autoComplete="off" readOnly={this.props.match.params.secid}
                                                  type="text" name="tradedate"
                                                  value={tradedate}
                                                  onChange={this.historyChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter tradedate"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridRegnumber">
                                    <Form.Label>Numtrades</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="numtrades"
                                                  value={numtrades} onChange={this.historyChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter numtrades"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridValue">
                                    <Form.Label>Value</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="value"
                                                  value={value} onChange={this.historyChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter value"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridOpen">
                                    <Form.Label>Open</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="open"
                                                  value={open} onChange={this.historyChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter open"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLow">
                                    <Form.Label>Low</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="low"
                                                  value={low} onChange={this.historyChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter low"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridHigh">
                                    <Form.Label>High</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="high"
                                                  value={high} onChange={this.historyChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter high"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridClose">
                                    <Form.Label>Close</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="close"
                                                  value={close} onChange={this.historyChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter close"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridVolume">
                                    <Form.Label>Volume</Form.Label>
                                    <Form.Control required autoComplete="off"
                                                  type="text" name="volume"
                                                  value={volume} onChange={this.historyChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter volume"/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {this.props.match.params.secid ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.histories.bind()}>
                                <FontAwesomeIcon icon={faList}/> Histories
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}
