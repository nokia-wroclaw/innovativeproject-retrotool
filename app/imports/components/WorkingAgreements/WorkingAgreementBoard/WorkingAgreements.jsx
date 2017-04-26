import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
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
            openSnackbar: false,
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

        createWorkingAgreement(sprintId, doc.text, doc.date, (err) => {
            if (err) {
                this.setState({
                    addWorkingAgreementError: err,
                });
            } else {
                this.setState({
                    openSnackbar: true,
                });
                this.hideAddWorkingAgreementModal();
            }
        });
    }

    handleRequestClose() {
        this.setState({
            openSnackbar: false,
        });
    }

    render() {
        const {
            addWorkingAgreementError,
            showAddWorkingAgreementModal,
            openSnackbar,
        } = this.state;

        const {
            workingAgreements,
            removeWorkingAgreement,
            isMember,
            isModerator,
            errorRemove,
            idToRemove,
        } = this.props;

        return (
            <div>
                <WorkingAgreementsToolbar
                    addWorkingAgreement={this.showAddWorkingAgreementModal}
                    isMember={isMember}
                />

                {workingAgreements.map(wa =>
                    <WorkingAgreement
                        key={wa._id}
                        id={wa._id}
                        text={wa.text}
                        date={wa.date}
                        deleteWorkingAgreement={removeWorkingAgreement}
                        isModerator={isModerator}
                        errorRemove={errorRemove}
                        idToRemove={idToRemove}
                    />,
                )}

                <AddWorkingAgreement
                    open={showAddWorkingAgreementModal}
                    onSubmit={this.addWorkingAgreement}
                    error={addWorkingAgreementError}
                    onClose={this.hideAddWorkingAgreementModal}
                />

                <Snackbar
                    open={openSnackbar}
                    message="New working agreement has been added!"
                    autoHideDuration={4000}
                    onRequestClose={() => this.handleRequestClose()}
                />
            </div>
        );
    }
}

WorkingAgreements.defaultProps = {
    errorRemove: '',
    idToRemove: '',
};

WorkingAgreements.propTypes = {
    createWorkingAgreement: PropTypes.func.isRequired,
    sprintId: PropTypes.string.isRequired,
    removeWorkingAgreement: PropTypes.func.isRequired,
    workingAgreements: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            date: PropTypes.instanceOf(Date).isRequired,
        }),
    ).isRequired,
    isMember: PropTypes.bool.isRequired,
    isModerator: PropTypes.bool.isRequired,
    errorRemove: PropTypes.string,
    idToRemove: PropTypes.string,
};

export default WorkingAgreements;
