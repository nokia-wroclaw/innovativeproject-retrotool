import React from 'react';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import { PropTypes } from 'prop-types';

export default class ProjectsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { filter: '' };
        this.func = this.func.bind(this);
        this.checker = this.checker.bind(this);
    }

    func(e) {
        this.setState({ filter: e.target.value });
    }

    checker(name) {
        if (name.search(this.state.filter) >= 0) { return true; } return false;
    }
    render() {
        return (
            <div>
                Find <input onChange={this.func} />
                <List>
                    <Subheader>Projects</Subheader>
                    {this.props.projects.map((project) => {
                        if (this.checker(project.name)) {
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
