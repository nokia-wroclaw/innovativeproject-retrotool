import React, { PropTypes } from 'react';
import {
    AppBar,
    Drawer,
    List,
    ListItem,
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
        const { children } = this.props;

        const { isDrawerOpen } = this.state;

        return (
            <div>
                <AppBar
                    title="Retro Tool"
                    onLeftIconButtonTouchTap={this.handleToggleDrawer}
                />
                <Drawer
                    open={isDrawerOpen}
                    docked={false}
                    onRequestChange={this.closeDrawer}
                >
                    <List>
                        <ListItem primaryText="Posts" />
                        <ListItem
                            primaryText="Sprints"
                            disabled
                            initiallyOpen
                            nestedItems={[
                                <ListItem key={6} primaryText="Sprint #6 (current)" />,
                                <ListItem key={5} primaryText="Sprint #5" />,
                                <ListItem key={4} primaryText="Sprint #4" />,
                                <ListItem key={3} primaryText="Sprint #3" />,
                                <ListItem key={2} primaryText="Sprint #2" />,
                                <ListItem key={1} primaryText="Sprint #1" />,
                            ]}
                        />
                    </List>
                </Drawer>
                {children}
            </div>
        );
    }
}
MainLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default MainLayout;
