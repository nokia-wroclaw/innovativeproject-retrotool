import React, { Component, PropTypes } from 'react';
import { TextField,
    RaisedButton,
    AutoComplete,
    List,
    ListItem,
} from 'material-ui';

class CreateNewProject extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.addModerator = this.addModerator.bind(this);
        this.state = {
            isResult: false,
            chosenMods: [],
            chosenMbrs: [],
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
        const { chosenMods, chosenMbrs } = this.state;

        const name = this.area.input.value;

        const moderatorsId = [];
        let user = '';

        chosenMods.forEach(moderator => {
            user = userList.find(obj => obj.services.github.username === moderator);
            moderatorsId.push(user._id);
            console.log(user);
        });
console.log(moderatorsId);
        const membersId = [];
        chosenMbrs.forEach(member => {
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
        const chosenMods = this.state.chosenMods.indexOf(name);

        if (usersNames !== -1 && chosenMods === -1) {
            const chosen = this.state.chosenMods;
            chosen.push(name);
            this.setState({
                chosenMods: chosen,
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
        const chosenMbrs = this.state.chosenMbrs.indexOf(name);
        const chosenMods = this.state.chosenMods.indexOf(name);

        if (usersNames !== -1 && chosenMbrs === -1 && chosenMods === -1) {
            const chosen = this.state.chosenMbrs;
            chosen.push(name);
            this.setState({
                chosenMbrs: chosen,
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
            const moderators = this.state.chosenMods;
            moderators.splice(index, 1);
            this.setState({
                chosenMods: moderators,
            });
        } else {
            const members = this.state.chosenMbrs;
            members.splice(index, 1);
            this.setState({
                chosenMbrs: members,
            });
        }
    }

    renderchosenMbrs() {
        const chosen = this.state.chosenMbrs;
        return chosen.map((name, index) => <ListItem key={`membername${name}`}>
            {name}
            <RaisedButton onTouchTap={e => this.removeRow(e, index, 'member')} label="Remove" type="submit" />
        </ListItem>,
        );
    }

    renderchosenMods() {
        const chosen = this.state.chosenMods;
        return chosen.map((name, index) => <ListItem key={`modname${name}`}>
            {name}
            <RaisedButton onTouchTap={e => this.removeRow(e, index, 'moderator')} label="Remove" type="submit" />
        </ListItem>,
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

    renderModForm() {
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
            {this.renderModForm()}
            {!this.state.error.type && this.state.isResult ? '' :
            <List>
                {this.renderchosenMods()}
            </List>
            }
            {this.renderMemberForm()}
            {!this.state.error.type && this.state.isResult ? '' :
            <div>
                <List>
                    {this.renderchosenMbrs()}
                </List>
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
