import React, {Component} from "react";
import axios from "axios";
import bsCustomFileInput from "bs-custom-file-input";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";

export class ImportHistories extends Component {
    onChange = event => {
        this.setState({file: event.target.files[0]});

    };

    histories = () => {
        return this.props.history.push("/histories");
    };

    onFileUpload = event => {
        this.fileData()

        event.preventDefault();

        const formData = new FormData();

        formData.append(
            "file",
            this.state.file,
        );

        axios.post("http://localhost:8080/api/history/import/", formData)
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

    constructor(props) {
        super(props);
        this.state = {
            name: 'React'
        };
    }

    componentDidMount() {
        bsCustomFileInput.init()
    }

    fileData = () => {

        if (this.state.file) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.file.name}</p>
                    <p>File Type: {this.state.file.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.file.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br/>
                    <h4>Choose before Pressing the Upload button</h4>
                    {this.fileData}
                </div>
            );
        }
    };

    render() {
        return (
            <div class="container">
                <Form onSubmit={this.onFileUpload}>
                    <div class="custom-file">
                        <input id="inputGroupFile" type="file" class="custom-file-input" onChange={this.onChange}/>
                        <label class="custom-file-label" for="inputGroupFile">Choose history_*.xml</label>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faUpload}/> Upload
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}
