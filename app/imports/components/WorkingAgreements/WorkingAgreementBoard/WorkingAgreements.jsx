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
                        sprintId={sprintId}
                        onData={onData}
                        handlers={handlers}
                        wrappedData={wrappedData}
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
                    onRequestClose={() => closeSnackBar(sprintId, onData, handlers, wrappedData)}
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
    sprintId: PropTypes.string.isRequired,
    addWorkingAgreement: PropTypes.func.isRequired,
    closeSnackBar: PropTypes.func.isRequired,
    wrappedData: PropTypes.func.isRequired,
    onData: PropTypes.func.isRequired,
    removeWorkingAgreement: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isModerator: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
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
    errorRemove: PropTypes.string,
    idToRemove: PropTypes.string,
    openSnackbar: PropTypes.bool,
    errorAdd: PropTypes.instanceOf(Error),
};

export default WorkingAgreements;
