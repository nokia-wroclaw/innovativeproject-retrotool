import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

import WorkingAgreementsToolbar from './WorkingAgreementsToolbar.jsx';
import WorkingAgreement from './WorkingAgreement.jsx';
import AddWorkingAgreement from '../AddWorkingAgreement';
import RemoveWorkingAgreement from '../RemoveWorkingAgreement';

import {
    getDefaultOptionValue,
    sort,
    sortOptions,
} from './utils.js';


class WorkingAgreements extends React.Component {
    constructor(props) {
        super(props);

        this.showAddWorkingAgreementModal = this.showAddWorkingAgreementModal.bind(this);
        this.hideAddWorkingAgreementModal = this.hideAddWorkingAgreementModal.bind(this);
        this.addWorkingAgreement = this.addWorkingAgreement.bind(this);
        this.deleteWorkingAgreement = this.deleteWorkingAgreement.bind(this);

        this.showRemoveWorkingAgreementModal = this.showRemoveWorkingAgreementModal.bind(this);
        this.hideRemoveWorkingAgreementModal = this.hideRemoveWorkingAgreementModal.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);

        this.handleChangeSort = this.handleChangeSort.bind(this);

        this.state = {
            showAddWorkingAgreementModal: false,
            showRemoveWorkingAgreementModal: false,
            workingAgreementId: '',
            openSnackbar: false,
            snackbarMessage: '',
            selectedSortId: getDefaultOptionValue(),
        };
    }

    componentWillReceiveProps(props) {
        const {
            errorAdd,
            errorRemove,
            addResult,
            removeResult,
        } = props;

        if (!errorAdd) {
            this.hideAddWorkingAgreementModal();
        }
        if (!errorRemove) {
            this.hideRemoveWorkingAgreementModal();
        }
        if (addResult) {
            this.setState({
                openSnackbar: true,
                snackbarMessage: 'Working agreement has been created!',
            });
        }
        if (removeResult) {
            this.setState({
                openSnackbar: true,
                snackbarMessage: 'Working agreement has been removed!',
            });
        }
    }

    handleChangeSort(event, index, value) {
        const { selectedSortId } = this.state;
        if (selectedSortId !== value) {
            this.setState({ selectedSortId: value });
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

    closeSnackBar() {
        this.setState({
            openSnackbar: false,
            openRemoveSnackbar: false,
        });
    }

    addWorkingAgreement(doc) {
        const {
            addWorkingAgreement,
            sprintId,
            projectId,
            onData,
            handlers,
            hideButton,
            wrappedData,
        } = this.props;

        addWorkingAgreement(
            sprintId,
            projectId,
            doc.text,
            doc.date,
            onData,
            handlers,
            hideButton,
            wrappedData,
        );
    }

    deleteWorkingAgreement(id) {
        const {
            removeWorkingAgreement,
            sprintId,
            projectId,
            onData,
            handlers,
            hideButton,
            wrappedData,
        } = this.props;

        removeWorkingAgreement(id, sprintId, projectId, onData, handlers, hideButton, wrappedData);
    }

    render() {
        const {
            showAddWorkingAgreementModal,
            showRemoveWorkingAgreementModal,
            workingAgreementId,
            openSnackbar,
            snackbarMessage,
            selectedSortId,
        } = this.state;

        const {
            isMember,
            isModerator,
            errorRemove,
            isClosed,
            errorAdd,
            hideButton,
        } = this.props;

        const workingAgreements = sort(this.props.workingAgreements, selectedSortId);

        return (
            <div>
                <WorkingAgreementsToolbar
                    addWorkingAgreement={this.showAddWorkingAgreementModal}
                    handleChangeSort={this.handleChangeSort}
                    selectedSortId={selectedSortId}
                    isMember={isMember}
                    isClosed={isClosed}
                    hideButton={hideButton}
                    sortOptions={sortOptions}
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
                    onSubmit={this.deleteWorkingAgreement}
                    error={errorRemove}
                    onClose={this.hideRemoveWorkingAgreementModal}
                    id={workingAgreementId}
                />

                <Snackbar
                    open={openSnackbar}
                    message={snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.closeSnackBar}
                />
            </div>
        );
    }
}

WorkingAgreements.defaultProps = {
    errorRemove: null,
    errorAdd: null,
    idToRemove: '',
    hideButton: false,
    addResult: false,
    removeResult: false,
};

WorkingAgreements.propTypes = {
    sprintId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    addWorkingAgreement: PropTypes.func.isRequired,
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
    hideButton: PropTypes.bool,
    addResult: PropTypes.bool,
    removeResult: PropTypes.bool,
    errorRemove: PropTypes.instanceOf(Error),
    errorAdd: PropTypes.instanceOf(Error),
};

export default WorkingAgreements;
