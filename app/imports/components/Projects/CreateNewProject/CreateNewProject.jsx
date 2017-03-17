import React, { Component, PropTypes } from 'react';
import { TextField,
    RaisedButton,
} from 'material-ui';

class CreateNewProject extends Component {

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
        const { createNewProject, goToProject } = this.props;

        const name = this.area.input.value;
        console.log('dziala');
        const result = createNewProject(name, [0], [0]);

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
                    hintText="New project name"
                    errorText={isError ? 'This field is required' : ''}
                />
            );
        }
        return (
            <span>New project has been created!</span>
        );
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h2>Here you can create a new project!</h2>
                {this.renderTextField()}
                {!this.state.isError && this.state.isResult ? '' :
                <RaisedButton label="Add" type="submit" primary />
                }
            </form>
        );
    }
}

CreateNewProject.propTypes = {
    createNewProject: PropTypes.func.isRequired,
    goToProject: PropTypes.func.isRequired,
};

export default CreateNewProject;

/*import React from 'react';

const CreateNewProject = () => (
    <h2>Here you can create a new project!</h2>
);

CreateNewProject.propTypes = {};

export default CreateNewProject;
*/
