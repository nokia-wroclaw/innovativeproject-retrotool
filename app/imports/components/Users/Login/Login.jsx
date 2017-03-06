import React, { PropTypes } from 'react';
import {
    Card,
    CardActions,
    CardText,
    CardTitle,
    RaisedButton,
} from 'material-ui';

const Login = (props) => {
    const {
        onGithubLogin,
        errorMessage,
    } = props;

    return (
        <Card>
            <CardTitle
                title="Retro Tool"
                subtitle="Login"
            />
            {errorMessage ?
                <CardText
                    color="red"
                >
                    {errorMessage}
                </CardText>
                :
                ''
            }
            <CardActions>
                <RaisedButton
                    label="Login with GitHub"
                    onClick={onGithubLogin}
                    fullWidth
                />
            </CardActions>
        </Card>
    );
};

Login.propTypes = {
    onGithubLogin: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
};

Login.defaultProps = {
    errorMessage: '',
};

export default Login;
