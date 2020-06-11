import React from 'react';
import './App.css';
import {NavigationBar} from './components/NavigationBar';

import {Col, Container, Row} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Welcome from "./components/Welcome";
import Footer from "./components/Footer"
import {Security} from "./components/Security";
import {SecurityList} from "./components/SecurityList";

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
                            <Route path="/add" exact component={Security}/>
                            <Route path="/edit/:id" exact component={Security}/>
                            <Route path="/list" exact component={SecurityList}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
          <Footer/>
        </Router>
    );
}

export default App;
