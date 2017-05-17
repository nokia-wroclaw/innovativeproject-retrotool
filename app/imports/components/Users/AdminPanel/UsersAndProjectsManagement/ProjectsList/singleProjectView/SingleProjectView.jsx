import React from 'react';
import Dialog from 'material-ui/Dialog';
import {
    AutoForm,
    ErrorsField,
    SelectField,
    SubmitField,
} from 'uniforms-material';
import { PropTypes } from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { schema } from './schema.js';

const SingleProjectView = props => (
    <div>
        <Dialog
            title={props.project.name}
            modal={false}
            open={props.openDialog}
            onRequestClose={props.closeDialog}
        >
            <List>
                <Subheader>Moderators</Subheader>
                {props.moderators.map(moderator => (
                    <ListItem
                        primaryText={props.options.find(x => x.value === moderator).label}
                        key={`${moderator}xD`}
                        onTouchTap={() => null}    // @TODO REMOVE FUNCTION
                    />
                        ),
                    )
                        }

            </List>
            <AutoForm
                className="content-container half"
                schema={schema}
            >
                <ErrorsField />
                <SelectField
                    name="moderators"
                    options={props.options}
                />
                <SubmitField
                    primary
                />
            </AutoForm>
        </Dialog>
    </div>
    );

export default SingleProjectView;

SingleProjectView.propTypes = {
    project: PropTypes.shape(PropTypes.shape({
        _id: PropTypes.string.isRequired,
    })).isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
        ).isRequired,

    openDialog: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    moderators: PropTypes.arrayOf(PropTypes.string).isRequired,

};
