import React from 'react';
import './App.css';
import {NavigationBar} from './components/NavigationBar';

import {Col, Container, Row} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Welcome from "./components/Welcome";
import Footer from "./components/Footer"
import {Security} from "./components/Security";
import {SecurityList} from "./components/SecurityList";
import {History} from "./components/History";
import {HistoryList} from "./components/HistoryList";
import {ImportSecurities} from "./components/ImportSecurities";
import {ImportHistories} from "./components/ImportHistories";

function App() {
    const marginTop = {
        marginTop: "20px"
    };

    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={14} style={marginTop}>
                        <Switch>
                            <Route path="/" exact component={Welcome}/>
                            <Route path="/add-security" exact component={Security}/>
                            <Route path="/edit-security/:id" exact component={Security}/>
                            <Route path="/securities" exact component={SecurityList}/>
                            <Route path="/add-history" exact component={History}/>
                            <Route path="/edit-history/:secid/:date" exact component={History}/>
                            <Route path="/histories" exact component={HistoryList}/>
                            <Route path="/import-securities" exact component={ImportSecurities}/>
                            <Route path="/import-histories" exact component={ImportHistories}/>
                            //todo: разобраться с редиректом на страницу сваггера
                            <Route path='/swagger' component={() => { window.location = 'https://tot-systems.herokuapp.com/swagger-ui.html#'; return null;} }/>
                            <Route path='/github' component={() => { window.location = 'https://github.com/MuradTcen/for-tot-systems'; return null;} }/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
          <Footer/>
        </Router>
    );
}

export default App;
