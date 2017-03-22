import React, { Component, PropTypes } from 'react';
import { TextField,
    RaisedButton,
    AutoComplete,
    List,
    ListItem,
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
            inputError: false,
            memberError: false,
            error: {
                type: '',
                message: '',
            },
        };
    }

    onSubmit(e) {
        e.preventDefault();
        const { createNewProject, userList } = this.props;
        const { moderators, members } = this.state;

        const name = this.area.input.value;

        const moderatorsId = [];
        let user = '';

        moderators.forEach(moderator => {
            user = userList.find(obj => obj.services.github.username === moderator);
            moderatorsId.push(user._id);
            console.log(user);
        });
console.log(moderatorsId);
        const membersId = [];
        members.forEach(member => {
            user = userList.find(obj => obj.services.github.username === member);
            membersId.push(user._id);
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

    addModerator(name, names) {
        const usersNames = names.indexOf(name);
        const moderators = this.state.moderators.indexOf(name);

        if (usersNames !== -1 && moderators === -1) {
            const chosen = this.state.moderators;
            chosen.push(name);
            this.setState({
                moderators: chosen,
                error: {
                    type: '',
                    message: '',
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

    addMember(name, names) {
        const usersNames = names.indexOf(name);
        const members = this.state.members.indexOf(name);
        const moderators = this.state.moderators.indexOf(name);

        if (usersNames !== -1 && members === -1 && moderators === -1) {
            const chosen = this.state.members;
            chosen.push(name);
            this.setState({
                members: chosen,
                error: {
                    type: '',
                    message: '',
                },
            });
        } else {
            this.setState({
                error: {
                    type: 'member',
                    message: 'There is no user with this name',
                },
            });
        }

        this.memberInput.setState({ searchText: '' });
        this.memberInput.focus();
    }

    removeRow(e, index, type) {
        e.preventDefault();

        if (type === 'moderator') {
            const moderators = this.state.moderators;
            moderators.splice(index, 1);
            this.setState({
                moderators: moderators,
            });
        } else {
            const members = this.state.members;
            members.splice(index, 1);
            this.setState({
                members: members,
            });
        }
    }

    rendermembers() {
        const chosen = this.state.members;
        return chosen.map((name, index) => <Chip key={`membername${name}`} onRequestDelete={e => this.removeRow(e, index, 'member')}>
            {name}
        </Chip>,
        );
    }

    rendermoderators() {
        const chosen = this.state.moderators;
        return chosen.map((name, index) => <Chip key={`modname${name}`} onRequestDelete={e => this.removeRow(e, index, 'moderator')}>
            {name}
        </Chip>,
        );
    }

    renderMemberForm() {
        const { isResult, error } = this.state;
        const users = this.props.userList;

        const names = [];

        users.forEach(user => {
            names.push(user.services.github.username);
        });

        if (!isResult) {
            return (
                <AutoComplete
                    floatingLabelText="Members"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={names}
                    maxSearchResults={5}
                    onNewRequest={e => this.addMember(e, names)}
                    errorText={error.type === 'member' ? error.message : ''}
                    ref={c => (this.memberInput = c)}
                />
            );
        }
        return false;
    }

    renderModeratorForm() {
        const { isResult, error } = this.state;
        const users = this.props.userList;

        const names = [];
        users.forEach(user => {
            names.push(user.services.github.username);
        });

        if (!isResult) {
            return (
                <AutoComplete
                    floatingLabelText="Moderators"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={names}
                    maxSearchResults={5}
                    onNewRequest={e => this.addModerator(e, names)}
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
                this.rendermoderators()
            }
            {this.renderMemberForm()}
            {!this.state.error.type && this.state.isResult ? '' :
            <div>
                {this.rendermembers()}
                <RaisedButton onTouchTap={e => this.onSubmit(e)} label="Create project" type="submit" primary />
            </div>
            }
        </div>
        );
    }
}

CreateNewProject.propTypes = {
    createNewProject: PropTypes.func.isRequired,
    userList: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default CreateNewProject;
