import React, { PropTypes } from 'react';
import connectField from 'uniforms/connectField';

import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';


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

        if (users.indexOf(e.id) === -1 && e.id) {
            this.setState({
                users: users.concat(e.id),
                inputText: '',
            });
            this.handleConnectFieldOnChange();
            this.refInput.focus();
        }
    }

    handleConnectFieldOnChange() {
        this.props.onChange(this.state.users);
    }

    updateInputText(e) {
        this.setState({
            inputText: e,
        });
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

        const options2 = options.map(user => ({
            text: user.label,
            value: <MenuItem primaryText={user.label} />,
            id: user.value,
        }));

        return (
            <AutoComplete
                ref={(ref) => { this.refInput = ref; }}
                filter={AutoComplete.fuzzyFilter}
                name={name}
                floatingLabelText={floatingLabelText}
                searchText={inputText}
                onNewRequest={this.addUser}
                dataSource={options2}
                onUpdateInput={this.updateInputText}
            />
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
