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
        };
    }

    componentWillMount() {
        const users = this.props.userList;

        let names = [];
        let ids = [];
        for(i=0; i < users.length; i++) {
            names.push(users[i].services.github.username);
            ids.push(users[i]._id);
        }

        this.setState({
            usersNames: names,
            usersIds: ids
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const { createNewProject } = this.props;
        const { chosenModerators, chosenMenbers, usersIds, usersNames } = this.state;

        const name = this.area.input.value;

        let moderatorsId = [];
        let index = 0;
        for(i = 0; i < chosenModerators.length; i++) {
            index = usersNames.indexOf(chosenModerators[i]);
            moderatorsId.push(usersIds[index]);
        }

        let membersId = [];
        index = 0;
        for(i = 0; i < chosenMenbers.length; i++) {
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

    renderModForm() {
        const { inputError, isResult, usersNames } = this.state;
        if (!isResult) {
            return (
                    <AutoComplete
                      floatingLabelText="Moderators"
                      filter={AutoComplete.fuzzyFilter}
                      dataSource={usersNames}
                      maxSearchResults={5}
                      onNewRequest={(e) => this.addMods(e)}
                      errorText={inputError ? 'No user find or user is already chosen' : ''}
                    ref={c => (this.modInput = c)}
                    />
            );
        }
    }

    renderMemberForm() {
        const { inputError, isResult, usersNames } = this.state;
        if (!isResult) {
            return (
                    <AutoComplete
                      floatingLabelText="Members"
                      filter={AutoComplete.fuzzyFilter}
                      dataSource={usersNames}
                      maxSearchResults={5}
                      onNewRequest={(e) => this.addMember(e)}
                      errorText={inputError ? 'No user find or user is already chosen' : ''}
                    ref={c => (this.memberInput = c)}
                    />
            );
        }
    }

    addMods(name) {
        if(this.state.usersNames.indexOf(name) !== -1 && this.state.chosenModerators.indexOf(name) === -1) {
            let chosen = this.state.chosenModerators;
            chosen.push(name);
            this.setState({
                chosenModerators: chosen,
                inputError: false
            });
        } else {
            this.setState({
                inputError: true
            });
        }

        this.modInput.setState({searchText:''});
        this.modInput.focus();
    }

    addMember(name) {
        if(this.state.usersNames.indexOf(name) !== -1 && this.state.chosenMenbers.indexOf(name) === -1 && this.state.chosenModerators.indexOf(name) === -1) {
            let chosen = this.state.chosenMenbers;
            chosen.push(name);
            this.setState({
                chosenMenbers: chosen,
                inputError: false
            });
        } else {
            this.setState({
                inputError: true
            });
        }

        this.memberInput.setState({searchText:''});
        this.memberInput.focus();
    }

    renderChosenModerators() {
        const chosen = this.state.chosenModerators;
        return chosen.map((name, index) => {
            return <ListItem key={index}>
                {name}
                <RaisedButton onTouchTap={(e) => this.removeRow(e, index, 'mod')} label="Remove" type="submit" />
            </ListItem>
        });
    }

    renderChosenMembers() {
        const chosen = this.state.chosenMenbers;
        return chosen.map((name, index) => {
            return <ListItem key={index}>
                {name}
                <RaisedButton onTouchTap={(e) => this.removeRow(e, index, 'member')} label="Remove" type="submit" />
            </ListItem>
        });
    }

    removeRow(e, index, type) {
        e.preventDefault();

        if(type === 'mod') {
            let moderators = this.state.chosenModerators;
            moderators.splice(index, 1);
            this.setState({
                chosenModerators: moderators
            });
        } else {
            let members = this.state.chosenMenbers;
            members.splice(index, 1);
            this.setState({
                chosenMenbers: members
            });
        }
    }

    render() {
        return ( <div>
                <h2>Here you can create a new project!</h2>
                {this.renderProjectNameForm()}

                {this.renderModForm()}
                <List>
                    {this.renderChosenModerators()}
                </List>
                {this.renderMemberForm()}
                <List>
                    {this.renderChosenMembers()}
                </List>

                {!this.state.isError && this.state.isResult ? '' :
                <RaisedButton onTouchTap={(e) => this.onSubmit(e)} label="Create project" type="submit" primary />
                }
            </div>
        );
    }
}

CreateNewProject.propTypes = {
    createNewProject: PropTypes.func.isRequired,
    userList: PropTypes.array.isRequired,
};

export default CreateNewProject;
