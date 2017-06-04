import React from 'react';
import PropTypes from 'prop-types';
import {
    AutoForm,
    SubmitField,
} from 'uniforms-material';
import {
    Dialog,
    FlatButton,
} from 'material-ui';
import UserSelectField from '/imports/components/CustomFormFields/UserSelectField.jsx';
import { schema } from './schema.js';

const AddMember = ({ projectId, users, addMembers, onClose, ...props }) =>
    <Dialog
        title="Add members"
        {...props}
    >
        <AutoForm
            schema={schema}
            onSubmit={(doc) => {
                addMembers({ projectId, ...doc });
                onClose();
            }}
        >
            <UserSelectField
                name="moderators"
                floatingLabelText="Moderators"
                options={users}
            />
            <UserSelectField
                name="members"
                floatingLabelText="Members"
                options={users}
            />
            <FlatButton
                label="Cancel"
                onTouchTap={onClose}
            />
            <SubmitField
                primary
            />
        </AutoForm>
    </Dialog>
;

AddMember.propTypes = {
    projectId: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    addMembers: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddMember;
