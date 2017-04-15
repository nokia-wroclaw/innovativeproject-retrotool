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
            moderatorText: '',
            memberText: '',
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
        const { createNewProject } = this.props;
        const { moderators, members } = this.state;

        const name = this.area.input.value;

        const moderatorsId = moderators.map(modarator => modarator._id);
        const membersId = members.map(member => member._id);

        const result = createNewProject(name, moderatorsId, membersId);

        if (result) {
            this.setState({
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
        );
    }

    render() {
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
