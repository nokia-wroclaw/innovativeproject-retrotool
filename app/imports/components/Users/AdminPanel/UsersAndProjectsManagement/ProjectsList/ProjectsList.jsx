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

        this.filtr = this.filtr.bind(this);
    }

    filtr(project) {
        return project.name.search(this.state.filter) >= 0;
    }
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
                        />
                    ))}
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
