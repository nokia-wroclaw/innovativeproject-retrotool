import React from 'react';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import { PropTypes } from 'prop-types';
import { actions } from '/imports/api/users/actions.js';
import AutoComplete from 'material-ui/AutoComplete';
import SingleProjectView from './singleProjectView/';

export default class ProjectsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: '',
            openDialog: false,
            project: [],
            moderators: [],
        };

        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.filtr = this.filtr.bind(this);
    }

    filtr(project) {
        return project.name.search(this.state.filter) >= 0;
    }

    openDialog(project) {
        this.setState({ openDialog: true });
        this.setState({ moderators: project.moderators });
        this.setState({ project });
    }
    closeDialog() { this.setState({ openDialog: false }); }

    render() {
        return (
            <div>
                Search: <AutoComplete
                    hintText="Type anything"
                    dataSource={actions.getProjectNames(this.props.projects)}
                    menuProps={{ desktop: true, disableAutoFocus: true }}
                    onUpdateInput={inputText => this.setState({ filter: inputText })}
                />
                <List>
                    <Subheader>Projects</Subheader>
                    {this.props.projects.filter(this.filtr).map(project => (
                        <ListItem
                            primaryText={project.name}
                            key={project._id}
                            onTouchTap={() => this.openDialog(project)}
                        />
                        ))}
                </List>
                <SingleProjectView
                    openDialog={this.state.openDialog}
                    project={this.state.project}
                    moderators={this.state.moderators}
                    closeDialog={this.closeDialog}
                />
            </div>
        );
    }
}

ProjectsList.propTypes = {
    projects: PropTypes.shape(PropTypes.shape({
        _id: PropTypes.string.isRequired,
    })).isRequired,
};
