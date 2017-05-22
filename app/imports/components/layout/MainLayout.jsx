import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Drawer,
} from 'material-ui';

import {
    actions as postActions,
} from '/imports/api/posts';
import {
    onLogOut,
    actions as usersActions,
} from '/imports/api/users';
import Navigation from './Navigation.jsx';

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.state = {
            isDrawerOpen: false,
        };
    }

    componentWillReceiveProps(props) {
        const { onRouteChanged } = props;

        if (onRouteChanged) {
            this.closeDrawer();
        }
    }

    closeDrawer() {
        this.setState({ isDrawerOpen: false });
    }

    handleToggleDrawer() {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    }

    render() {
        const {
            drawerContent,
            main,
            isLoggedInUser,
            isCurrentUserAdmin,
            title,
            projectId,
            sprintId,
        } = this.props;

        const { isDrawerOpen } = this.state;

        return (
            <div>
                <AppBar
                    title={title}
                    onLeftIconButtonTouchTap={this.handleToggleDrawer}
                    iconElementRight={
                        <Navigation
                            goToWall={() => postActions.goToPosts(projectId, sprintId)}
                            goToProfile={usersActions.goToProfile}
                            goToAdminPanel={usersActions.goToAdminPanel}
                            onLogOut={onLogOut}
                            showButtons={{
                                wall: isLoggedInUser && !!projectId && !!sprintId,
                                profile: isLoggedInUser,
                                adminPanel: isCurrentUserAdmin,
                                logout: isLoggedInUser,
                            }}
                        />
                    }
                />
                <Drawer
                    open={isDrawerOpen}
                    docked={false}
                    onRequestChange={this.closeDrawer}
                >
                    {drawerContent}
                </Drawer>
                <div>
                    {main}
                </div>
            </div>
        );
    }
}
MainLayout.propTypes = {
    title: PropTypes.string.isRequired,
    main: PropTypes.node.isRequired,
    drawerContent: PropTypes.node.isRequired,
    isLoggedInUser: PropTypes.bool.isRequired,
    isCurrentUserAdmin: PropTypes.bool.isRequired,
    onRouteChanged: PropTypes.func.isRequired,
    projectId: PropTypes.string,
    sprintId: PropTypes.string,
};

MainLayout.defaultProps = {
    isLoggedInUser: false,
    isCurrentUserAdmin: false,
    projectId: '',
    sprintId: '',
};

export default MainLayout;
