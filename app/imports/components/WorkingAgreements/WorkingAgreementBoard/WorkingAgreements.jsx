import React from 'react';
import PropTypes from 'prop-types';
import WorkingAgreementsToolbar from './WorkingAgreementsToolbar.jsx';

import AddWorkingAgreement from '../AddWorkingAgreement';


class WorkingAgreements extends React.Component {
    constructor(props) {
        super(props);

        this.showAddWorkingAgreementModal = this.showAddWorkingAgreementModal.bind(this);
        this.hideAddWorkingAgreementModal = this.hideAddWorkingAgreementModal.bind(this);
        this.addWorkingAgreement = this.addWorkingAgreement.bind(this);

        this.state = {
            showAddWorkingAgreementModal: false,
            addWorkingAgreementError: null,
        };
    }

    showAddWorkingAgreementModal() {
        this.setState({ showAddWorkingAgreementModal: true });
    }

    hideAddWorkingAgreementModal() {
        this.setState({
            showAddWorkingAgreementModal: false,
            addWorkingAgreementError: null,
        });
    }

    addWorkingAgreement(doc) {
        console.log(doc);
    }

    render() {
        const {
            addWorkingAgreementError,
            showAddWorkingAgreementModal,
        } = this.state;

        return (
            <div>
                <WorkingAgreementsToolbar
                    addWorkingAgreement={this.showAddWorkingAgreementModal}
                />

                <AddWorkingAgreement
                    open={showAddWorkingAgreementModal}
                    onSubmit={this.addWorkingAgreement}
                    error={addWorkingAgreementError}
                    onClose={this.hideAddWorkingAgreementModal}
                />
            </div>
        )
    }
}

WorkingAgreements.propTypes = {
    createWorkingAgreement: PropTypes.func.isRequired,
};

export default WorkingAgreements;
