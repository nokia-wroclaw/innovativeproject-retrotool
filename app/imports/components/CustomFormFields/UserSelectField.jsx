import React, { PropTypes } from 'react';
import connectField from 'uniforms/connectField';

import {
    AutoComplete,
    MenuItem,
    Chip,
    Avatar,
} from 'material-ui';


class UserSelectField extends React.Component {
    constructor(props) {
        super(props);

        this.addUser = this.addUser.bind(this);
        this.updateInputText = this.updateInputText.bind(this);

        this.state = {
            users: [],
            inputText: '',
            errorMessage: '',
        };
    }

    addUser(e) {
        const { users } = this.state;
        const isSelected = users.find(user => user.id === e.id);

        if (!isSelected && e.id) {
            this.setState({
                users: users.concat({ id: e.id, name: e.text, avatar: e.avatar }),
                inputText: '',
                errorMessage: '',
            });
            this.handleConnectFieldOnChange();
        } else {
            this.setState({
                errorMessage: 'User does not exists or is already on list',
            });
        }
        this.refInput.focus();
    }

    handleConnectFieldOnChange() {
        const { users } = this.state;
        const picked = users.map(user => user.id);

        this.props.onChange(picked);
    }

    updateInputText(e) {
        this.setState({
            inputText: e,
            errorMessage: '',
        });
    }

    handleRequestDelete(index) {
        const { users } = this.state;
        users.splice(index, 1);

        this.setState({
            users,
        });
        this.handleConnectFieldOnChange();
    }

    render() {
        const {
            name,
            options,
            floatingLabelText,
            fullWidth,
        } = this.props;

        const {
            inputText,
            errorMessage,
        } = this.state;

        const userList = options.map(user => ({
            text: user.label,
            value: <MenuItem
                primaryText={user.label}
                rightIcon={<Avatar src={user.avatar} />}
            />,
            id: user.value,
            avatar: user.avatar,
        }));

        return (
            <div>
                <AutoComplete
                    ref={(ref) => { this.refInput = ref; }}
                    filter={AutoComplete.fuzzyFilter}
                    name={name}
                    floatingLabelText={floatingLabelText}
                    searchText={inputText}
                    onNewRequest={this.addUser}
                    dataSource={userList}
                    onUpdateInput={this.updateInputText}
                    errorText={errorMessage}
                    fullWidth={fullWidth}
                />
                {this.state.users.map((user, index) =>
                    <Chip
                        className="chip"
                        key={user.id}
                        onRequestDelete={() => this.handleRequestDelete(index)}
                    >
                        <Avatar src={user.avatar} />
                        {user.name}
                    </Chip>,
                )}
            </div>
        );
    }
}

UserSelectField.defaultProps = {
    floatingLabelText: '',
    options: {
        avatar: '',
    },
    fullWidth: false,
};

UserSelectField.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        }).isRequired,
    ).isRequired,
    floatingLabelText: PropTypes.string,
    fullWidth: PropTypes.bool,
};

export default connectField(UserSelectField, { ensureValue: false });
