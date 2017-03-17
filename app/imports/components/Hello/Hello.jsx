import React from 'react';
import { RaisedButton } from 'material-ui';

const Hello = (props) => {
    const { goToAddProject } = props;

    return <div>
        <h1>Hello!</h1>
            <RaisedButton
                label="Add new project"
                type="submit"
                primary
                onTouchTap={() => goToAddProject()}
            />
    </div>
};

Hello.propTypes = {};

export default Hello;
