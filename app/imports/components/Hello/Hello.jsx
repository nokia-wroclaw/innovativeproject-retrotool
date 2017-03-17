import React, { PropTypes } from 'react';
import { RaisedButton } from 'material-ui';

const Hello = (props) => {
    const { goToAddProject } = props;

    return (<div>
        <h1>Hello!</h1>
        <RaisedButton
            label="Add new project"
            type="submit"
            primary
            onTouchTap={() => goToAddProject()}
        />
    </div>
    );
};

Hello.propTypes = {
    goToAddProject: PropTypes.func.isRequired,
};

export default Hello;
