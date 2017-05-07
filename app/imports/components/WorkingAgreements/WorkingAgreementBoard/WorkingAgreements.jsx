import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import WorkingAgreementsToolbar from './WorkingAgreementsToolbar.jsx';
import WorkingAgreement from './WorkingAgreement.jsx';
import AddWorkingAgreement from '../AddWorkingAgreement';
import RemoveWorkingAgreement from '../RemoveWorkingAgreement';


class WorkingAgreements extends React.Component {
    constructor(props) {
        super(props);

        this.showAddWorkingAgreementModal = this.showAddWorkingAgreementModal.bind(this);
        this.hideAddWorkingAgreementModal = this.hideAddWorkingAgreementModal.bind(this);
        this.addWorkingAgreement = this.addWorkingAgreement.bind(this);

        this.showRemoveWorkingAgreementModal = this.showRemoveWorkingAgreementModal.bind(this);
        this.hideRemoveWorkingAgreementModal = this.hideRemoveWorkingAgreementModal.bind(this);

        this.state = {
            showAddWorkingAgreementModal: false,
            showRemoveWorkingAgreementModal: false,
            workingAgreementId: '',
        };
    }

    componentWillReceiveProps(props) {
        if (!props.errorAdd && props.openSnackbar) {
            this.hideAddWorkingAgreementModal();
        }
        if (!props.errorRemove && props.openRemoveSnackbar) {
            this.hideRemoveWorkingAgreementModal();
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

    showRemoveWorkingAgreementModal(workingAgreementId) {
        this.setState({
            showRemoveWorkingAgreementModal: true,
            workingAgreementId,
        });
    }

    hideRemoveWorkingAgreementModal() {
        this.setState({
            showRemoveWorkingAgreementModal: false,
        });
    }

    addWorkingAgreement(doc) {
        const {
            addWorkingAgreement,
            sprintId,
            onData,
            handlers,
            wrappedData,
        } = this.props;

        addWorkingAgreement(sprintId, doc.text, doc.date, onData, handlers, wrappedData);
    }

    render() {
        const {
            showAddWorkingAgreementModal,
            showRemoveWorkingAgreementModal,
            workingAgreementId,
        } = this.state;

        const {
            workingAgreements,
            removeWorkingAgreement,
            isMember,
            isModerator,
            errorRemove,
            isClosed,
            errorAdd,
            openSnackbar,
            openRemoveSnackbar,
            closeSnackBar,
            sprintId,
            onData,
            handlers,
            wrappedData,
        } = this.props;

        return (
            <div>
                <WorkingAgreementsToolbar
                    addWorkingAgreement={this.showAddWorkingAgreementModal}
                    isMember={isMember}
                    isClosed={isClosed}
                />

                <div className="content-container">
                    {workingAgreements.map(wa =>
                        <WorkingAgreement
                            key={wa._id}
                            id={wa._id}
                            text={wa.text}
                            date={wa.date}
                            deleteWorkingAgreement={this.showRemoveWorkingAgreementModal}
                            isModerator={isModerator}
                            sprintId={sprintId}
                            onData={onData}
                            handlers={handlers}
                            wrappedData={wrappedData}
                        />,
                    )}
                </div>

                <AddWorkingAgreement
                    open={showAddWorkingAgreementModal}
                    onSubmit={this.addWorkingAgreement}
                    error={errorAdd}
                    onClose={this.hideAddWorkingAgreementModal}
                />

                <RemoveWorkingAgreement
                    open={showRemoveWorkingAgreementModal}
                    onSubmit={removeWorkingAgreement}
                    error={errorRemove}
                    onClose={this.hideRemoveWorkingAgreementModal}
                    id={workingAgreementId}
                    sprintId={sprintId}
                    onData={onData}
                    handlers={handlers}
                    wrappedData={wrappedData}
                />

                <Snackbar
                    open={openSnackbar}
                    message="New working agreement has been added!"
                    autoHideDuration={4000}
                    onRequestClose={() => closeSnackBar(sprintId, onData, handlers, wrappedData)}
                />

                <Snackbar
                    open={openRemoveSnackbar}
                    message="Working agreement has been removed!"
                    autoHideDuration={4000}
                    onRequestClose={() => closeSnackBar(sprintId, onData, handlers, wrappedData)}
                />
            </div>
        );
    }
}

WorkingAgreements.defaultProps = {
    errorRemove: null,
    errorAdd: null,
    idToRemove: '',
    openSnackbar: false,
    openRemoveSnackbar: false,
};

WorkingAgreements.propTypes = {
    sprintId: PropTypes.string.isRequired,
    addWorkingAgreement: PropTypes.func.isRequired,
    closeSnackBar: PropTypes.func.isRequired,
    wrappedData: PropTypes.func.isRequired,
    onData: PropTypes.func.isRequired,
    removeWorkingAgreement: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isModerator: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
    openSnackbar: PropTypes.bool.isRequired,
    openRemoveSnackbar: PropTypes.bool.isRequired,
    workingAgreements: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            date: PropTypes.instanceOf(Date).isRequired,
        }),
    ).isRequired,
    handlers: PropTypes.arrayOf(
        PropTypes.shape({
            subscriptionId: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    errorRemove: PropTypes.instanceOf(Error),
    errorAdd: PropTypes.instanceOf(Error),
};

export default WorkingAgreements;
