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
        this.addMods = this.addMods.bind(this);
        this.state = {
            isError: false,
            isResult: false,
            usersNames: [],
            usersIds: [],
            chosenModerators: [],
            chosenMenbers: [],
            inputError: false,
            memberError: false,
        };
    }

    componentWillMount() {
        const users = this.props.userList;

        const names = [];
        const ids = [];
        for (let i = 0; i < users.length; i += 1) {
            names.push(users[i].services.github.username);
            ids.push(users[i]._id);
        }

        this.setState({
            usersNames: names,
            usersIds: ids,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const { createNewProject } = this.props;
        const { chosenModerators, chosenMenbers, usersIds, usersNames } = this.state;

        const name = this.area.input.value;

        const moderatorsId = [];
        let index = 0;
        for (let i = 0; i < chosenModerators.length; i += 1) {
            index = usersNames.indexOf(chosenModerators[i]);
            moderatorsId.push(usersIds[index]);
        }

        const membersId = [];
        index = 0;
        for (let i = 0; i < chosenMenbers.length; i += 1) {
            index = usersNames.indexOf(chosenMenbers[i]);
            membersId.push(usersIds[index]);
        }

        const result = createNewProject(name, moderatorsId, membersId);

        if (result) {
            this.setState({
                isError: false,
                isResult: true,
            });
        } else {
            this.setState({
                isError: true,
                isResult: false,
            });
        }
    }

    addMods(name) {
        const usersNames = this.state.usersNames.indexOf(name);
        const chosenModerators = this.state.chosenModerators.indexOf(name);

        if (usersNames !== -1 && chosenModerators === -1) {
            const chosen = this.state.chosenModerators;
            chosen.push(name);
            this.setState({
                chosenModerators: chosen,
                inputError: false,
            });
        } else {
            this.setState({
                inputError: true,
            });
        }

        this.modInput.setState({ searchText: '' });
        this.modInput.focus();
    }

    addMember(name) {
        const usersNames = this.state.usersNames.indexOf(name);
        const chosenMenbers = this.state.chosenMenbers.indexOf(name);
        const chosenModerators = this.state.chosenModerators.indexOf(name);

        if (usersNames !== -1 && chosenMenbers === -1 && chosenModerators === -1) {
            const chosen = this.state.chosenMenbers;
            chosen.push(name);
            this.setState({
                chosenMenbers: chosen,
                memberError: false,
            });
        } else {
            this.setState({
                memberError: true,
            });
        }

        this.memberInput.setState({ searchText: '' });
        this.memberInput.focus();
    }

    removeRow(e, index, type) {
        e.preventDefault();

        if (type === 'mod') {
            const moderators = this.state.chosenModerators;
            moderators.splice(index, 1);
            this.setState({
                chosenModerators: moderators,
            });
        } else {
            const members = this.state.chosenMenbers;
            members.splice(index, 1);
            this.setState({
                chosenMenbers: members,
            });
        }
    }

    renderChosenMembers() {
        const chosen = this.state.chosenMenbers;
        return chosen.map((name, index) => <ListItem key={`membername${name}`}>
            {name}
            <RaisedButton onTouchTap={e => this.removeRow(e, index, 'member')} label="Remove" type="submit" />
        </ListItem>,
        );
    }

    renderChosenModerators() {
        const chosen = this.state.chosenModerators;
        return chosen.map((name, index) => <ListItem key={`modname${name}`}>
            {name}
            <RaisedButton onTouchTap={e => this.removeRow(e, index, 'mod')} label="Remove" type="submit" />
        </ListItem>,
        );
    }

    renderMemberForm() {
        const { memberError, isResult, usersNames } = this.state;
        if (!isResult) {
            return (
                <AutoComplete
                    floatingLabelText="Members"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={usersNames}
                    maxSearchResults={5}
                    onNewRequest={e => this.addMember(e)}
                    errorText={memberError ? 'No user find or user is already chosen' : ''}
                    ref={c => (this.memberInput = c)}
                />
            );
        }
        return false;
    }

    renderModForm() {
        const { inputError, isResult, usersNames } = this.state;
        if (!isResult) {
            return (
                <AutoComplete
                    floatingLabelText="Moderators"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={usersNames}
                    maxSearchResults={5}
                    onNewRequest={e => this.addMods(e)}
                    errorText={inputError ? 'No user find or user is already chosen' : ''}
                    ref={c => (this.modInput = c)}
                />
            );
        }
        return false;
    }

    renderProjectNameForm() {
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
        return (<div>
            <h2>Here you can create a new project!</h2>
            {this.renderProjectNameForm()}
            {this.renderModForm()}
            {!this.state.isError && this.state.isResult ? '' :
            <List>
                {this.renderChosenModerators()}
            </List>
            }
            {this.renderMemberForm()}
            {!this.state.isError && this.state.isResult ? '' :
            <div>
                <List>
                    {this.renderChosenMembers()}
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
