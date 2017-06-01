import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardText,
    CardTitle,
    CardActions,
    FlatButton,
} from 'material-ui';

import CategoryManager from '/imports/components/CategoryManager';
import UsersList from './UsersAndProjectsManagement/UsersList';
import ProjectsList from './UsersAndProjectsManagement/ProjectsList';

const renderView = (viewName) => {
    if (viewName === 'manageUsers') {
        return <UsersList />;
    } else if (viewName === 'manageProjects') {
        return <ProjectsList />;
    } else if (viewName === 'manageCategories') {
        return <CategoryManager />;
    }
    return <div />;
};

export default class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedView: 'manageUsers' };
        this.changeView = this.changeView.bind(this);
    }

    changeView(selectedView) {
        this.setState({ selectedView });
    }

    render() {
        const {
            selectedView,
        } = this.state;

        return (
            <div className="content-container">
                <Card>
                    <CardTitle
                        title="Retro Tool - Admin Panel"
                        subtitle="Admin"
                    />
                    <CardActions>
                        <FlatButton
                            onTouchTap={() => this.changeView('manageUsers')}
                            label="Manage Users"
                        />
                        <FlatButton
                            onTouchTap={() => this.changeView('manageProjects')}
                            label="Manage Projects"
                        />
                        <FlatButton
                            onTouchTap={() => this.changeView('manageCategories')}
                            label="Manage Categories"
                        />
                    </CardActions>
                </Card>

                <Card>
                    <CardText>
                        {renderView(selectedView)}
                    </CardText>
                </Card>
            </div>
        );
    }
}


AdminPanel.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};

AdminPanel.defaultProps = {
    isAdmin: false,
};
