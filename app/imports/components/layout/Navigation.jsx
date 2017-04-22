import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { getStyles } from 'material-ui/AppBar/AppBar';

const Navigation = (props, context) => {
    const { flatButton } = getStyles(props, context);
    const {
        goToWall,
        goToProfile,
        goToAdminPanel,
        onLogOut,
        showButtons: {
            wall,
            profile,
            adminPanel,
            logout,
        },
    } = props;
    return (
        <div>
            {wall &&
                <FlatButton
                    label="Wall"
                    style={flatButton}
                    onTouchTap={goToWall}
                />
            }
            {profile &&
                <FlatButton
                    label="My Profile"
                    style={flatButton}
                    onTouchTap={goToProfile}
                />
            }
            {adminPanel &&
                <FlatButton
                    label="Admin Panel"
                    style={flatButton}
                    onTouchTap={goToAdminPanel}
                />
            }
            {logout &&
                <FlatButton
                    label="Log Out"
                    style={flatButton}
                    onTouchTap={onLogOut}
                />
            }
        </div>
    );
};

Navigation.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

Navigation.propTypes = {
    goToWall: PropTypes.func.isRequired,
    goToProfile: PropTypes.func.isRequired,
    goToAdminPanel: PropTypes.func.isRequired,
    onLogOut: PropTypes.func.isRequired,
    showButtons: PropTypes.shape({
        wall: PropTypes.bool.isRequired,
        profile: PropTypes.bool.isRequired,
        adminPanel: PropTypes.bool.isRequired,
        logout: PropTypes.bool.isRequired,
    }).isRequired,
};

Navigation.defaultProps = {
    goToWall() {},
    goToProfile() {},
    goToAdminPanel() {},
    onLogOut() {},
    showButtons: {
        wall: false,
        profile: false,
        adminPanel: false,
        logout: false,
    },
};

export default Navigation;
