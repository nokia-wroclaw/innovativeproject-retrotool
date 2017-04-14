import { AddNewModerator } from './addNewModerator.jsx';
import React from 'react';


export class SingleProjectView extends React.Component {

    constructor(props) {
        console.log('SingleProjectView Constructor');
        super(props);
        this.AddNewModerator = false;
    }
    render() {
        return (<div><h1>Manage project: {this.props.proj.name}</h1>
            <div>Project ID: {this.props.proj._id}</div>
            <div>Project Members: {this.props.members}</div>
            {this.AddNewModerator && <AddNewModerator />}
        </div>);
    }
}
