import { Projects } from '/imports/api/projects';
import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { SingleProjectView } from './SingleProjectView/singleProjectView.jsx';


export class ProjectList extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.projects = Projects.find({});
        this.state = { value: this.projects.count() };
        this.projName = this.projects.fetch()[this.state.value - 1].name;
        this.items = [];
        for (let i = 1; i <= this.projects.count(); i += 1) {
            this.items.push(
                <MenuItem value={i} key={i} primaryText={this.projects.fetch()[i - 1].name} />,
                );
        }
    }

    handleChange(event, index, _value) {
        console.log('ListOfProjects handleChange', 'index = ', index, 'value = ', _value);
        this.setState({ value: _value });
        this.state.value = _value;
        this.projName = this.projects.fetch()[this.state.value - 1].name;
    }
    render() {
        return (
            <div>
                <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange}>
                    {this.items}
                </DropDownMenu>
                <SingleProjectView value={this.projName} />
            </div>
        );
    }
}

