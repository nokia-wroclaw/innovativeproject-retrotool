import { AddNewModerator } from './addNewModerator.jsx';
import React from 'react';


export class SingleProjectView extends React.Component {

    constructor(props) {
        console.log('SingleProjectView Constructor');
        super(props);
        this.AddNewModerator = false;
    }
    render() {
        return (<div><h1>Manage project: {this.props.value}</h1>
                Tutaj beda rozne opcje do edycji Projektow
            {this.AddNewModerator && <AddNewModerator />}
        </div>);
    }
}
