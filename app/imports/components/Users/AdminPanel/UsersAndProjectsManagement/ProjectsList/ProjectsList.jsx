import React from 'react';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import { PropTypes } from 'prop-types';
import { actions } from '/imports/api/users/actions.js';
import AutoComplete from 'material-ui/AutoComplete';

export default class ProjectsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: '',
        };

        this.projects = actions.getProjectNames(this.props.projects);
    }

    render() {
        return (
            <div>
                Search: <AutoComplete
                    hintText="Type anything"
                    dataSource={this.projects}
                    menuProps={{ desktop: true, disableAutoFocus: true }}
                    onUpdateInput={inputText => this.setState({ filter: inputText })}
                />
                <List>
                    <Subheader>Projects</Subheader>
                    {this.props.projects.map((project) => {
                        if (project.name.search(this.state.filter) >= 0) {
                            return (
                                <ListItem
                                    primaryText={project.name}
                                    key={project._id}
                                />
                            );
                        }
                        return undefined;
                    })}
                </List>
            </div>
        );
    }
}

ProjectsList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
    })).isRequired,
};
