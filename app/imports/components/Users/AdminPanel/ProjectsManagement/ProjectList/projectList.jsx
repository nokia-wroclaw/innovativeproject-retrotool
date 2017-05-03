import React from 'react';
import Subheader from 'material-ui/Subheader';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { PropTypes } from 'prop-types';


export class ProjectList extends React.Component {

    constructor(props) {
        super(props);
        this.SelectableList = makeSelectable(List); // @TODO Do it like in tutorial
        this.projects = props.projects;
    }

    render() {
        return (
            <div>
                <this.SelectableList defaultValue={3}>
                    <Subheader>Projects</Subheader>
                    {this.projects.map(project => (
                        <ListItem
                            value={1}
                            primaryText={project.name} // @@TODO change field
                            key={project._id}
                            leftAvatar={<i>P</i>}
                        />
        ))}
                </this.SelectableList>
            </div>
        );
    }
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
};
