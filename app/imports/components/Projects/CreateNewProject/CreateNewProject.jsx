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
<<<<<<< HEAD
            moderators: [],
            members: [],
            inputError: false,
            memberError: false,
=======
            moderatorText: '',
            memberText: '',
            moderators: [],
            members: [],
>>>>>>> origin/devel
            error: {
                type: '',
                message: '',
            },
        };
    }

    onSubmit(e) {
        e.preventDefault();
<<<<<<< HEAD
        const { createNewProject, userList } = this.props;
=======
        const { createNewProject } = this.props;
>>>>>>> origin/devel
        const { moderators, members } = this.state;

        const name = this.area.input.value;

<<<<<<< HEAD
        const moderatorsId = [];
        let user = '';

        moderators.forEach((moderator) => {
            user = userList.find(obj => obj.services.github.username === moderator);
            moderatorsId.push(user._id);
        });

        const membersId = [];
        members.forEach((member) => {
            user = userList.find(obj => obj.services.github.username === member);
            membersId.push(user._id);
        });
=======
        const moderatorsId = moderators.map(modarator => modarator._id);
        const membersId = members.map(member => member._id);
>>>>>>> origin/devel

        const result = createNewProject(name, moderatorsId, membersId);

        if (result) {
            this.setState({
<<<<<<< HEAD
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
        } else if (usersNames !== -1 && members === -1 && moderators !== -1) {
            this.setState({
                error: {
                    type: 'member',
                    message: 'User is chosen as a member',
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
=======
                isResult: true,
            });
            this.clearError();
        } else if (!result && name) {
            this.setState({
                isResult: false,
            });
            this.setError('project', 'You have no permission');
        } else {
            this.setState({
                isResult: false,
            });
            this.setError('project', 'This field is required');
        }
    }

    setError(type, message) {
        this.setState({
            error: {
                type,
                message,
            },
        });
    }

    setModeratorText(text) {
        this.setState({
            moderatorText: text,
        });
    }

    setMemberText(text) {
        this.setState({
            memberText: text,
        });
    }

    addModerator(id) {
        const chosen = this.state.moderators;

        const isModeratorExists = chosen.find(user =>
            user._id === id,
        );

        if (id && !isModeratorExists) {
            const newUserList = this.props.newUserList;

            const chosenUser = newUserList.find(user =>
                user._id === id,
            );
            chosen.push(chosenUser);

            this.setState({
                moderators: chosen,
            });
            this.clearError();
        } else if (id && isModeratorExists) {
            this.setError('moderator', 'User is already chosen');
        } else {
            this.setError('moderator', 'There is no user with this name');
        }

        this.setState({
            moderatorText: '',
        });
        this.moderatorInput.focus();
    }

    addMember(id) {
        const chosen = this.state.members;

        const isMemberExists = chosen.find(user =>
            user._id === id,
        );

        if (id && !isMemberExists) {
            const newUserList = this.props.newUserList;

            const chosenUser = newUserList.find(user =>
                user._id === id,
            );
            chosen.push(chosenUser);

            this.setState({
                members: chosen,
            });
            this.clearError();
        } else if (id && isMemberExists) {
            this.setError('member', 'User is already chosen');
        } else {
            this.setError('member', 'There is no user with this name');
        }

        this.setState({
            memberText: '',
        });
>>>>>>> origin/devel
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

<<<<<<< HEAD
    rendermembers() {
        const chosen = this.state.members;
        return chosen.map((name, index) => <Chip key={`membername${name}`} onRequestDelete={e => this.removeMember(e, index)}>
            {name}
        </Chip>,
        );
    }

    rendermoderators() {
        const chosen = this.state.moderators;
        return chosen.map((name, index) => <Chip key={`modname${name}`} onRequestDelete={e => this.removeModerator(e, index)}>
            {name}
        </Chip>,
        );
    }

    renderMemberForm() {
        const { isResult, error } = this.state;
        const users = this.props.userList;

        const names = [];

        users.forEach(user => names.push(user.services.github.username));

        if (!isResult) {
            return (
                <AutoComplete
                    floatingLabelText="Members - optional"
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
        users.forEach(user => names.push(user.services.github.username));

        if (!isResult) {
            return (
                <AutoComplete
                    floatingLabelText="Moderators - optional"
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
=======
    clearError() {
        this.setState({
            error: {
                type: '',
                message: '',
            },
        });
    }

    renderMembers() {
        const chosen = this.state.members;
        return chosen.map((user, index) => (
            <Chip
                key={`membername${user.username}`}
                onRequestDelete={e => this.removeMember(e, index)}
            >
                {user.username}
            </Chip>
        ));
    }

    renderModerators() {
        const chosen = this.state.moderators;
        return chosen.map((user, index) => (
            <Chip
                key={`modname${user.username}`}
                onRequestDelete={e => this.removeModerator(e, index)}
            >
                {user.username}
            </Chip>
        ));
    }

    renderMemberForm() {
        const { error, memberText } = this.state;
        const users = this.props.newUserList;

        const dataSourceConfig = {
            text: 'username',
            value: '_id',
        };

        return (
            <AutoComplete
                floatingLabelText="Members - optional"
                filter={AutoComplete.fuzzyFilter}
                dataSource={users}
                dataSourceConfig={dataSourceConfig}
                maxSearchResults={5}
                onNewRequest={value => this.addMember(value._id)}
                errorText={error.type === 'member' ? error.message : ''}
                onUpdateInput={text => this.setMemberText(text)}
                searchText={memberText}
                ref={input => (this.memberInput = input)}
            />
        );
    }

    renderModeratorForm() {
        const { error, moderatorText } = this.state;
        const users = this.props.newUserList;

        const dataSourceConfig = {
            text: 'username',
            value: '_id',
        };

        return (
            <AutoComplete
                floatingLabelText="Moderators - optional"
                filter={AutoComplete.fuzzyFilter}
                dataSource={users}
                dataSourceConfig={dataSourceConfig}
                maxSearchResults={5}
                onNewRequest={value => this.addModerator(value._id)}
                errorText={error.type === 'moderator' ? error.message : ''}
                onUpdateInput={text => this.setModeratorText(text)}
                searchText={moderatorText}
                ref={input => (this.moderatorInput = input)}
            />
        );
    }

    renderProjectNameForm() {
        const { error } = this.state;

        return (
            <TextField
                ref={ref => (this.area = ref)}
                hintText="New project name"
                errorText={error.type === 'project' ? error.message : ''}
            />
>>>>>>> origin/devel
        );
    }

    render() {
<<<<<<< HEAD
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
=======
        const { isResult } = this.state;

        return (<div>
            <h2>Here you can create a new project!</h2>
            {isResult ? <h3>New project has been created!</h3> :
            <div>
                {this.renderProjectNameForm()}
                {this.renderModeratorForm()}
                {this.renderModerators()}
                {this.renderMemberForm()}
                {this.renderMembers()}
                <RaisedButton
                    onTouchTap={this.onSubmit}
                    label="Create project"
                    type="submit"
                    primary
                />
>>>>>>> origin/devel
            </div>
            }
        </div>
        );
    }
}

CreateNewProject.propTypes = {
    createNewProject: PropTypes.func.isRequired,
<<<<<<< HEAD
    userList: PropTypes.arrayOf(
=======
    newUserList: PropTypes.arrayOf(
>>>>>>> origin/devel
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default CreateNewProject;
