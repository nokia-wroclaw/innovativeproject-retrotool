import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Card, CardTitle } from 'material-ui';
import React from 'react';
import { PropTypes } from 'prop-types';
import UsersList from './UsersAndProjectsManagement/UsersList';
import ProjectsList from './UsersAndProjectsManagement/ProjectsList';

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
                        icon={<FontIcon className="muidocs-icon-custom-github" />}
                    />
                    <RaisedButton
                        onTouchTap={this.changeOption}
                        label="Manage Projects"
                        icon={<FontIcon className="muidocs-icon-custom-github" />}
                    />
                </Card>
                { this.state.option ? <UsersList /> : <ProjectsList /> }
            </div>
        );
    }
}

Panel.defaultProps = {
    isAdmin: false,
};

Panel.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};