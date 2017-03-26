import React, { Component, PropTypes } from 'react';
import { TextField,
    RaisedButton,
    AutoComplete,
    Chip,
} from 'material-ui';

class CreateNewProject extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.addModerator = this.addModerator.bind(this);
        this.state = {
            isResult: false,
            moderators: [],
            members: [],
            error: {
                type: '',
                message: '',
            },
        };
    }

    onSubmit(e) {
        e.preventDefault();
        const { createNewProject, newUserList } = this.props;
        const { moderators, members } = this.state;

        const name = this.area.input.value;

        const moderatorsId = moderators.map((modarator) => {
            return modarator._id
        });

        const membersId = members.map((member) => {
            return member._id
        });

        const result = createNewProject(name, moderatorsId, membersId);

        if (result) {
            this.setState({
                error: {
                    type: '',
                    message: '',
                },
                isResult: true,
            });
        } else if (!result && name) {
            this.setState({
                error: {
                    type: 'project',
                    message: 'You have no permission',
                },
                isResult: false,
            });
        } else {
            this.setState({
                error: {
                    type: 'project',
                    message: 'This field is required',
                },
                isResult: false,
            });
        }
    }

    addModerator(id) {
        const chosen = this.state.moderators;

        const isModeratorExists = chosen.find((user) => {
            return user._id ===  id
        });

        if (id && !isModeratorExists) {
            const newUserList = this.props.newUserList;


            const chosenUser = newUserList.find((user) => {
                return user._id ===  id
            });
            chosen.push(chosenUser);

            this.setState({
                moderators: chosen,
                error: {
                    type: '',
                    message: '',
                },
            });
        } else if (id && isModeratorExists) {
            this.setState({
                error: {
                    type: 'moderator',
                    message: 'User is already chosen',
                },
            });
        } else {
            this.setState({
                error: {
                    type: 'moderator',
                    message: 'There is no user with this name',
                },
            });
        }

        this.moderatorInput.setState({ searchText: '' });
        this.moderatorInput.focus();
    }

    addMember(id) {
        const chosen = this.state.members;

        const isMemberExists = chosen.find((user) => {
            return user._id ===  id
        });

        if (id && !isMemberExists) {
            const newUserList = this.props.newUserList;


            const chosenUser = newUserList.find((user) => {
                return user._id ===  id
            });
            chosen.push(chosenUser);

            this.setState({
                members: chosen,
                error: {
                    type: '',
                    message: '',
                },
            });
        } else if (id && isMemberExists) {
            this.setState({
                error: {
                    type: 'moderator',
                    message: 'User is already chosen',
                },
            });
        } else {
            this.setState({
                error: {
                    type: 'moderator',
                    message: 'There is no user with this name',
                },
            });
        }

        this.memberInput.setState({ searchText: '' });
        this.memberInput.focus();
    }

    removeModerator(e, index) {
        e.preventDefault();

        const moderators = this.state.moderators;
        moderators.splice(index, 1);
        this.setState({
            moderators,
        });
    }

    removeMember(e, index) {
        e.preventDefault();

        const members = this.state.members;
        members.splice(index, 1);
        this.setState({
            members,
        });
    }

    renderMembers() {
        const chosen = this.state.members;
        return chosen.map((user, index) => <Chip key={`membername${user.username}`} onRequestDelete={e => this.removeMember(e, index)}>
            {user.username}
        </Chip>,
        );
    }

    renderModerators() {
        const chosen = this.state.moderators;
        return chosen.map((user, index) => <Chip key={`modname${user.username}`} onRequestDelete={e => this.removeModerator(e, index)}>
            {user.username}
        </Chip>,
        );
    }

    renderMemberForm() {
        const { isResult, error } = this.state;
        const users = this.props.newUserList;

        const dataSourceConfig = {
            text: 'username',
            value: '_id',
        };

        if (!isResult) {
            return (
                <AutoComplete
                    floatingLabelText="Members - optional"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={users}
                    dataSourceConfig={dataSourceConfig}
                    maxSearchResults={5}
                    onNewRequest={value => this.addMember(value._id)}
                    errorText={error.type === 'member' ? error.message : ''}
                    ref={c => (this.memberInput = c)}
                />
            );
        }
        return false;
    }

    renderModeratorForm() {
        const { isResult, error } = this.state;
        const users = this.props.newUserList;

        const dataSourceConfig = {
            text: 'username',
            value: '_id',
        };

        if (!isResult) {
            return (
                <AutoComplete
                    floatingLabelText="Moderators - optional"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={users}
                    dataSourceConfig={dataSourceConfig}
                    maxSearchResults={5}
                    onNewRequest={value => this.addModerator(value._id)}
                    errorText={error.type === 'moderator' ? error.message : ''}
                    ref={c => (this.moderatorInput = c)}
                />
            );
        }
        return false;
    }

    renderProjectNameForm() {
        const { error, isResult } = this.state;
        if (!isResult) {
            return (
                <TextField
                    ref={ref => (this.area = ref)}
                    hintText="New project name"
                    errorText={error.type === 'project' ? error.message : ''}
                />
            );
        }
        return (
            <span>New project has been created!</span>
        );
    }

    render() {
        return (<div>
            <h2>Here you can create a new project!</h2>
            {this.renderProjectNameForm()}
            {this.renderModeratorForm()}
            {!this.state.error.type && this.state.isResult ? '' :
                this.renderModerators()
            }
            {this.renderMemberForm()}
            {!this.state.error.type && this.state.isResult ? '' :
            <div>
                {this.renderMembers()}
                <RaisedButton onTouchTap={e => this.onSubmit(e)} label="Create project" type="submit" primary />
            </div>
            }
        </div>
        );
    }
}



CreateNewProject.propTypes = {
    createNewProject: PropTypes.func.isRequired,
    newUserList: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default CreateNewProject;
