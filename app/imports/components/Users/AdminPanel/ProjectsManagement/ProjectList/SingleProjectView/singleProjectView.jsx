import React from 'react';
import { PropTypes } from 'prop-types';

export class SingleProjectView extends React.Component {

    constructor(props) {
        super(props);
        this.AddNewModerator = false;
    }
    render() {
        return (<div><h1>Manage project: {this.props.proj.name}</h1>
            <div>Project ID: {this.props.proj._id}</div>
            <div>Project Members: {this.props.members}</div>
        </div>);
    }
}

SingleProjectView.propTypes = {
    proj: PropTypes.element.isRequired,
    members: PropTypes.string.isRequired,
};
