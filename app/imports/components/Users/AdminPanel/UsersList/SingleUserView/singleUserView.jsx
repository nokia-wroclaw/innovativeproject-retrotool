import React from 'react';
import { AddNewAdmin } from './addNewAdmin.jsx';



export class SingleUserView extends React.Component {

    constructor(props) {
        console.log('SingleProjectView Constructor');
        super(props);
        this.AddNewAdmin = false;
        this.AddNewModerator = false;
    }
    render() {
        return (<div><h1>Manage project: {this.props.value}</h1>
                Tutaj beda rozne opcje do edycji Userow
                { this.showAdmin && <AddNewAdmin />}
        </div>);
    }
}
