import React, { PropTypes } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


export class ProjectList extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.projects = props.projects;
        this.state = { value: this.projects.count() };
        this.proj = this.projects.fetch()[this.state.value - 1];
        this.items = [];
        for (let i = 1; i <= this.projects.count(); i += 1) {
            this.items.push(
                <MenuItem value={i} key={i} primaryText={this.projects.fetch()[i - 1].name} />,
                );
        }
    }

    handleChange(event, index, _value) {
        this.setState({ value: _value });
        this.state.value = _value;
        this.proj = this.projects.fetch()[this.state.value - 1];
    }
    render() {
        return (
            <div>
                <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange}>
                    {this.items}
                </DropDownMenu>
            </div>
        );
    }
}

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(Array).isRequired,
};
