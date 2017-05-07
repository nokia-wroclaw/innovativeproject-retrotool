import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardTitle } from 'material-ui';
import React from 'react';
import { PropTypes } from 'prop-types';
import UsersList from './UsersManagement/UsersList';
import ProjectList from './UsersManagement/ProjectList';

export default class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { option: true };
        this.changeOption = this.changeOption.bind(this);
    }

    changeOption() {
        this.setState({ option: !this.state.option });
    }

    render() {
        return (
            <div>
                <Card>
                    <CardTitle
                        title="Retro Tool- Admin Panel"
                        subtitle="Admin"
                    />
                    <RaisedButton
                        onTouchTap={this.changeOption}
                        label="Manage Users"
                        secondary
                        icon={<FontIcon className="muidocs-icon-custom-github" />}
                    />
                    <RaisedButton
                        onTouchTap={this.changeOption}
                        label="Manage Projects"
                        secondary
                        icon={<FontIcon className="muidocs-icon-custom-github" />}
                    />
                </Card>
                { this.state.option ? <UsersList /> : <ProjectList /> }
            </div>
        );
    }
}

Panel.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};
