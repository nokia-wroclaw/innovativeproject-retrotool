import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Drawer,
} from 'material-ui';
import { onLogOut } from '/imports/api/users';
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
        } = this.props;
        const { isDrawerOpen } = this.state;

        return (
            <div>
                <AppBar
                    title={title}
                    onLeftIconButtonTouchTap={this.handleToggleDrawer}
                    iconElementRight={
                        <Navigation
                            goToWall={() => {}}
                            goToProfile={() => {}}
                            goToAdminPanel={() => {}}
                            onLogOut={onLogOut}
                            showButtons={{
                                wall: isLoggedInUser,
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
};

MainLayout.defaultProps = {
    isLoggedInUser: false,
    isCurrentUserAdmin: false,
};

export default MainLayout;
