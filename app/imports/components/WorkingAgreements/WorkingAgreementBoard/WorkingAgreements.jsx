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
        };
    }

    componentWillReceiveProps(props) {
        if (!props.errorAdd && props.openSnackbar) {
            this.hideAddWorkingAgreementModal();
        }
    }

    showAddWorkingAgreementModal() {
        this.setState({ showAddWorkingAgreementModal: true });
    }

    hideAddWorkingAgreementModal() {
        this.setState({
            showAddWorkingAgreementModal: false,
        });
    }

    addWorkingAgreement(doc) {
        const {
            aaddWorkingAgreement,
            sprintId,
        } = this.props;

        aaddWorkingAgreement(sprintId, doc.text, doc.date);
    }

    render() {
        const {
            showAddWorkingAgreementModal,
        } = this.state;

        const {
            workingAgreements,
            removeWorkingAgreement,
            isMember,
            isModerator,
            errorRemove,
            idToRemove,
            isClosed,
            errorAdd,
            openSnackbar,
            closeSnackBar,
        } = this.props;

        return (
            <div>
                <WorkingAgreementsToolbar
                    addWorkingAgreement={this.showAddWorkingAgreementModal}
                    isMember={isMember}
                    isClosed={isClosed}
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
                    error={errorAdd}
                    onClose={this.hideAddWorkingAgreementModal}
                />

                <Snackbar
                    open={openSnackbar}
                    message="New working agreement has been added!"
                    autoHideDuration={4000}
                    onRequestClose={closeSnackBar}
                />
            </div>
        );
    }
}

WorkingAgreements.defaultProps = {
    errorRemove: '',
    errorAdd: null,
    idToRemove: '',
    openSnackbar: false,
};

WorkingAgreements.propTypes = {
    aaddWorkingAgreement: PropTypes.func.isRequired,
    closeSnackBar: PropTypes.func.isRequired,
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
    isClosed: PropTypes.bool.isRequired,
    errorRemove: PropTypes.string,
    errorAdd: PropTypes.instanceOf(Error),
    idToRemove: PropTypes.string,
    openSnackbar: PropTypes.bool,
};

export default WorkingAgreements;
