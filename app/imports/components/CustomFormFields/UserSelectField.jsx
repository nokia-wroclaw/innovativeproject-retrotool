import React, { PropTypes } from 'react';
import connectField from 'uniforms/connectField';

import {
    AutoComplete,
    MenuItem,
    Chip,
} from 'material-ui';


class UserSelectField extends React.Component {
    constructor(props) {
        super(props);

        this.addUser = this.addUser.bind(this);
        this.updateInputText = this.updateInputText.bind(this);

        this.state = {
            users: [],
            inputText: '',
        };
    }

    addUser(e) {
        const { users } = this.state;
        const isSelected = users.find(user => user.id === e.id);

        if (!isSelected) {
            this.setState({
                users: users.concat({ id: e.id, name: e.text }),
                inputText: '',
            });
            this.handleConnectFieldOnChange();
            this.refInput.focus();
        }
    }

    handleConnectFieldOnChange() {
        const { users } = this.state;
        const picked = users.map(user => user.id);

        this.props.onChange(picked);
    }

    updateInputText(e) {
        this.setState({
            inputText: e,
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
        } = this.props;

        const {
            inputText,
        } = this.state;

        const userList = options.map(user => ({
            text: user.label,
            value: <MenuItem primaryText={user.label} />,
            id: user.value,
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
                />
                {this.state.users.map((user, index) =>
                    <Chip
                        key={user.id}
                        onRequestDelete={() => this.handleRequestDelete(index)}
                    >
                        {user.name}
                    </Chip>,
                )}
            </div>
        );
    }
}

UserSelectField.defaultProps = {
    floatingLabelText: '',
};

UserSelectField.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    floatingLabelText: PropTypes.string,
};

export default connectField(UserSelectField, { ensureValue: false });
