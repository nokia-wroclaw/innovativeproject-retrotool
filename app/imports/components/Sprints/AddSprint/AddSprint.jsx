import React, { Component, PropTypes } from 'react';
import { TextField,
    RaisedButton,
} from 'material-ui';
import { browserHistory } from 'react-router';

class AddSprint extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            isErorr: false,
            isResult: false,
        };
    }

    onSubmit(e) {
        e.preventDefault();

        const projectId = this.props.projectId;
        const addNewSprint = this.props.addNewSprint;

        const name = this.area.input.value;

        const result = addNewSprint(name, projectId);

        if (result) {
            this.setState({
                isErorr: false,
                isResult: true,
            });
            browserHistory.push(`/project/${projectId}`);
        } else {
            this.setState({
                isErorr: true,
                isResult: false,
            });
        }
    }

    renderTextField() {
        if (!this.state.isErorr && !this.state.isResult) {
            return (
                <TextField
                    ref={(c) => { this.area = c; }}
                    hintText="New sprint name"
                />
            );
        } else if (this.state.isErorr && !this.state.isResult) {
            return (
                <TextField
                    ref={(c) => { this.area = c; }}
                    hintText="New sprint name"
                    errorText="This field is required"
                />
            );
        } else if (!this.state.isErorr && this.state.isResult) {
            return <span>New sprint has been added!</span>;
        }
        return false;
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h2>Add new sprint</h2>
                {this.renderTextField()}
                {!this.state.isErorr && this.state.isResult ? '' :
                <RaisedButton label="Add" type="submit" primary />
                }
            </form>
        );
    }
}

AddSprint.propTypes = {
    projectId: PropTypes.string.isRequired,
    addNewSprint: PropTypes.func.isRequired,
};

export default AddSprint;
