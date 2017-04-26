import React from 'react';
import PropTypes from 'prop-types';
import WorkingAgreementsToolbar from './WorkingAgreementsToolbar.jsx';
import WorkingAgreement from './WorkingAgreement.jsx';

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
        const {
            createWorkingAgreement,
            sprintId,
        } = this.props;

        this.hideAddWorkingAgreementModal();
        createWorkingAgreement(sprintId, doc.text, doc.date, (error) => {
            if (error) {
                this.setState({ addWorkingAgreementError: new Error(error.reason || error) });
            }
        });
    }

    render() {
        const {
            addWorkingAgreementError,
            showAddWorkingAgreementModal,
        } = this.state;

        const {
            workingAgreements,
            deleteWorkingAgreement,
        } = this.props;

        return (
            <div>
                <WorkingAgreementsToolbar
                    addWorkingAgreement={this.showAddWorkingAgreementModal}
                />

                {workingAgreements.map(wa =>
                    <WorkingAgreement
                        key={wa._id}
                        id={wa._id}
                        text={wa.text}
                        date={wa.date}
                        deleteWorkingAgreement={deleteWorkingAgreement}
                    />,
                )}

                <AddWorkingAgreement
                    open={showAddWorkingAgreementModal}
                    onSubmit={this.addWorkingAgreement}
                    error={addWorkingAgreementError}
                    onClose={this.hideAddWorkingAgreementModal}
                />
            </div>
        );
    }
}

WorkingAgreements.propTypes = {
    createWorkingAgreement: PropTypes.func.isRequired,
    sprintId: PropTypes.string.isRequired,
    deleteWorkingAgreement: PropTypes.func.isRequired,
    workingAgreements: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            date: PropTypes.instanceOf(Date).isRequired,
        }),
    ).isRequired,
};

export default WorkingAgreements;
