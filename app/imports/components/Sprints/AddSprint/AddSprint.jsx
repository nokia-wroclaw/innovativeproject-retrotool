import React, { Component, PropTypes } from 'react';
import { TextField,
    RaisedButton,
} from 'material-ui';

class AddSprint extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            isError: false,
            isResult: false,
        };
    }

    onSubmit(e) {
        e.preventDefault();
        const { projectId, addNewSprint, goToProject } = this.props;

        const name = this.area.input.value;
        const result = addNewSprint(name, projectId);

        if (result) {
            this.setState({
                isError: false,
                isResult: true,
            });

            goToProject(projectId);
        } else {
            this.setState({
                isError: true,
                isResult: false,
            });
        }
    }

    renderTextField() {
        const { isError, isResult } = this.state;

        if (!isResult) {
            return (
                <TextField
                    ref={ref => (this.area = ref)}
                    hintText="New sprint name"
                    errorText={isError ? 'This field is required' : ''}
                />
            );
        }
        return (
            <span>New sprint has been added!</span>
        );
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h2>Add new sprint</h2>
                {this.renderTextField()}
                {!this.state.isError && this.state.isResult ? '' :
                <RaisedButton label="Add" type="submit" primary />
                }
            </form>
        );
    }
}

AddSprint.propTypes = {
    projectId: PropTypes.string.isRequired,
    addNewSprint: PropTypes.func.isRequired,
    goToProject: PropTypes.func.isRequired,
};

export default AddSprint;
