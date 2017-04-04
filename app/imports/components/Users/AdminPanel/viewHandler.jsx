import React from 'react';
import { ProjectList } from './ProjectList/projectList.jsx';
import { UsersList } from './UsersList/usersList.jsx';

export class ViewHandler extends React.Component {

    constructor(props) {
        super(props);
        console.log('In view Handler');
    }

    render() {
        if (this.props.vireChoice === 'user') {
            return (
                <div>
                    {<UsersList />}
                </div>);
        }
        if (this.props.vireChoice === 'project') {
            return (
                <div>
                    {<ProjectList />}
                </div>);
        }
    }
}

