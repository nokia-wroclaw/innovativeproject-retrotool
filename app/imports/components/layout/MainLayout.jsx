import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import {
    AppBar,
    Drawer,
    FlatButton,
} from 'material-ui';

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
<<<<<<< HEAD
        const { drawerContent, onLogOut, main } = this.props;
=======
        const { drawerContent, main } = this.props;
>>>>>>> origin/devel

        const { isDrawerOpen } = this.state;

        return (
            <div>
                <AppBar
                    title="Retro Tool"
                    onLeftIconButtonTouchTap={this.handleToggleDrawer}
<<<<<<< HEAD
                    iconElementRight={<FlatButton onTouchTap={onLogOut} label="Log out" />}
=======
                    iconElementRight={<FlatButton
                        onTouchTap={() => Meteor.logout(() => { browserHistory.push('/login'); })}
                        label="Log out"
                    />}
>>>>>>> origin/devel
                />
                <Drawer
                    open={isDrawerOpen}
                    docked={false}
                    onRequestChange={this.closeDrawer}
                >
                    {drawerContent}
                </Drawer>
                {main}
            </div>
        );
    }
}
MainLayout.propTypes = {
    main: PropTypes.node.isRequired,
    drawerContent: PropTypes.node.isRequired,
<<<<<<< HEAD
    onLogOut: PropTypes.func.isRequired,
=======
>>>>>>> origin/devel
};

export default MainLayout;
