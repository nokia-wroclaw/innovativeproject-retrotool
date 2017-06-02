import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import ActionItemsToolbar from './ActionItemsToolbar.jsx';
import ActionItem from './ActionItem.jsx';
import AddActionItem from './../AddActionItem';
import CloseOrReopenActionItem from './../CloseOrReopenActionItem';

import {
    getDefaultOptionValue,
    sort,
    sortOptions,
} from './utils.js';


const isSelected = (ai, selectedState) =>
    ai.open.toString() === selectedState || selectedState === 'all';

class ActionItems extends React.Component {
    constructor(props) {
        super(props);

        this.showAddActionItemModal = this.showAddActionItemModal.bind(this);
        this.hideAddActionItemModal = this.hideAddActionItemModal.bind(this);
        this.addActionItem = this.addActionItem.bind(this);

        this.showToggleActionItemModal = this.showToggleActionItemModal.bind(this);
        this.hideToggleActionItemModal = this.hideToggleActionItemModal.bind(this);
        this.toggleModalActionItem = this.toggleModalActionItem.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.handleChangeSort = this.handleChangeSort.bind(this);

        this.state = {
            showAddActionItemModal: false,
            showToggleActionItemModal: false,
            openSnackbar: false,
            snackbarMessage: '',
            actionItemId: '',
            selectedState: 'all',
            isOpen: false,
            message: '',
            selectedSortId: getDefaultOptionValue(),
            error: null,
        };
    }

    onChangeCategory(event, index, value) {
        this.setState({ selectedState: value });
    }

    handleChangeSort(event, index, value) {
        const { selectedSortId } = this.state;
        if (selectedSortId !== value) {
            this.setState({ selectedSortId: value });
        }
    }

    showAddActionItemModal() {
        this.setState({ showAddActionItemModal: true });
    }

    hideAddActionItemModal() {
        this.setState({
            showAddActionItemModal: false,
            error: null,
        });
    }

    showToggleActionItemModal(actionItemId, isOpen, closeMessage) {
        this.setState({
            showToggleActionItemModal: true,
            actionItemId,
            isOpen,
            message: closeMessage,
        });
    }

    hideToggleActionItemModal() {
        this.setState({
            showToggleActionItemModal: false,
            error: null,
        });
    }

    closeSnackBar() {
        this.setState({
            openSnackbar: false,
        });
    }

    addActionItem(doc) {
        const {
            createActionItem,
            sprintId,
        } = this.props;

        createActionItem(
            sprintId,
            doc.startDate,
            doc.endDate,
            doc.assignee,
            doc.text,
        ).then(() => {
            this.hideAddActionItemModal();
            this.setState({
                openSnackbar: true,
                snackbarMessage: 'New action item has been created!',
            });
        }).catch((error) => {
            this.setState({
                error,
            });
        });
    }

    toggleModalActionItem(doc) {
        const {
            toggleActionItemState,
        } = this.props;

        const { actionItemId } = this.state;

        toggleActionItemState(
            actionItemId,
            doc.closeMessage,
        ).then(() => {
            this.hideToggleActionItemModal();
            this.setState({
                openSnackbar: true,
                snackbarMessage: 'Changes saved!',
            });
        }).catch((error) => {
            this.setState({
                error,
            });
        });
    }

    render() {
        const {
            showAddActionItemModal,
            showToggleActionItemModal,
            selectedState,
            isOpen,
            message,
            openSnackbar,
            snackbarMessage,
            selectedSortId,
            error,
        } = this.state;

        const {
            isMember,
            isModerator,
            userId,
            idToRemove,
            isClosed,
            hideButton,
        } = this.props;

        const actionItems = sort(this.props.actionItems, selectedSortId);

        return (
            <div>
                <ActionItemsToolbar
                    addActionItem={this.showAddActionItemModal}
                    onChangeCategory={this.onChangeCategory}
                    handleChangeSort={this.handleChangeSort}
                    selectedSortId={selectedSortId}
                    selectedState={selectedState}
                    sortOptions={sortOptions}
                    isMember={isMember}
                    isClosed={isClosed}
                    hideButton={hideButton}
                />

                <div className="content-container">
                    {actionItems
                        .filter(ai => isSelected(ai, selectedState))
                        .map(({ _id, text, startDate, endDate, open, assignee, closeMessage }) =>
                            <ActionItem
                                key={_id}
                                id={_id}
                                text={text}
                                startDate={startDate}
                                endDate={endDate}
                                open={open}
                                assignee={assignee}
                                closeMessage={closeMessage}
                                toggleActionItem={
                                    () => this.showToggleActionItemModal(_id, open, closeMessage)
                                }
                                isModerator={isModerator}
                                userId={userId}
                                idToRemove={idToRemove}
                            />,
                    )}
                </div>

                <AddActionItem
                    open={showAddActionItemModal}
                    onSubmit={this.addActionItem}
                    error={error}
                    onClose={this.hideAddActionItemModal}
                />

                <CloseOrReopenActionItem
                    open={showToggleActionItemModal}
                    onSubmit={this.toggleModalActionItem}
                    error={error}
                    onClose={this.hideToggleActionItemModal}
                    isOpen={isOpen}
                    closeMessage={message}
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

ActionItems.defaultProps = {
    idToRemove: '',
    hideButton: false,
};

ActionItems.propTypes = {
    sprintId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    createActionItem: PropTypes.func.isRequired,
    toggleActionItemState: PropTypes.func.isRequired,
    isMember: PropTypes.bool.isRequired,
    isModerator: PropTypes.bool.isRequired,
    isClosed: PropTypes.bool.isRequired,
    actionItems: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            startDate: PropTypes.instanceOf(Date).isRequired,
            endDate: PropTypes.instanceOf(Date).isRequired,
            assigneeId: PropTypes.string.isRequired,
            assignee: PropTypes.shape({
                name: PropTypes.string,
                avatar: PropTypes.string,
            }).isRequired,
        }),
    ).isRequired,
    idToRemove: PropTypes.string,
    hideButton: PropTypes.bool,
};

export default ActionItems;
