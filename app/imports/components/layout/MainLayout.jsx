import React, { PropTypes } from 'react';
import {
    AppBar,
    Drawer,
    RaisedButton,
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
        const { drawerContent, onLogOut, main } = this.props;

        const { isDrawerOpen } = this.state;

        return (
            <div>
                <AppBar
                    title="Retro Tool"
                    onLeftIconButtonTouchTap={this.handleToggleDrawer}
                    iconElementRight={<FlatButton onTouchTap={onLogOut} label="Log out" />}
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
    onLogOut: PropTypes.func.isRequired,
};

export default MainLayout;
