import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
} from 'material-ui';

import { schema } from './schema.js';

const AddWorkingAgreement = ({
    error,
    onClose,
    onSubmit,
    open,
}) => (
    <Dialog
        title="Add working agreement"
        open={open}
    >

    </Dialog>
);


AddWorkingAgreement.propTypes = {
    error: PropTypes.instanceOf(Error),
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

AddWorkingAgreement.defaultProps = {
    error: null,
    open: false,
};

export default AddWorkingAgreement;
