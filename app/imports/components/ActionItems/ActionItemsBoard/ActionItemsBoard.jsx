import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import ActionItemsToolbar from './ActionItemsToolbar.jsx';
import ActionItem from './ActionItem.jsx';
import AddActionItem from './../AddActionItem';
import CloseOrReopenActionItem from './../CloseOrReopenActionItem';

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

        this.state = {
            showAddActionItemModal: false,
            showToggleActionItemModal: false,
            openSnackbar: false,
            snackbarMessage: '',
            actionItemId: '',
            selectedState: 'all',
            isOpen: false,
            message: '',
        };
    }

    componentWillReceiveProps(props) {
        const {
            errorAdd,
            errorToggle,
            addResult,
            toggleResult,
        } = props;

        if (!errorAdd) {
            this.hideAddActionItemModal();
        }
        if (!errorToggle) {
            this.hideToggleActionItemModal();
        }
        if (addResult) {
            this.setState({
                openSnackbar: true,
                snackbarMessage: 'New action item has been created!',
            });
        }
        if (toggleResult) {
            this.setState({
                openSnackbar: true,
                snackbarMessage: 'Changes saved!',
            });
        }
    }

    onChangeCategory(event, index, value) {
        this.setState({ selectedState: value });
    }

    showAddActionItemModal() {
        this.setState({ showAddActionItemModal: true });
    }

    hideAddActionItemModal() {
        this.setState({ showAddActionItemModal: false });
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
        this.setState({ showToggleActionItemModal: false });
    }

    closeSnackBar() {
        this.setState({
            openSnackbar: false,
        });
    }

    addActionItem(doc) {
        const {
            addActionItem,
            sprintId,
            onData,
            handlers,
            hideButton,
            wrappedData,
        } = this.props;

        addActionItem(
            sprintId,
            doc.startDate,
            doc.endDate,
            doc.assignee,
            doc.text,
            onData,
            handlers,
            hideButton,
            wrappedData,
        );
    }

    toggleModalActionItem(doc) {
        const {
            toggleActionItem,
            sprintId,
            onData,
            handlers,
            hideButton,
            wrappedData,
        } = this.props;

        const { actionItemId } = this.state;

        toggleActionItem(
            actionItemId,
            doc.closeMessage,
            onData,
            sprintId,
            handlers,
            hideButton,
            wrappedData,
        );
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
        } = this.state;

        const {
            actionItems,
            isMember,
            isModerator,
            userId,
            errorToggle,
            idToRemove,
            isClosed,
            errorAdd,
            hideButton,
        } = this.props;

        return (
            <div>
                <ActionItemsToolbar
                    addActionItem={this.showAddActionItemModal}
                    onChangeCategory={this.onChangeCategory}
                    selectedState={selectedState}
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
                    error={errorAdd}
                    onClose={this.hideAddActionItemModal}
                />

                <CloseOrReopenActionItem
                    open={showToggleActionItemModal}
                    onSubmit={this.toggleModalActionItem}
                    error={errorToggle}
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
    errorToggle: null,
    errorAdd: null,
    idToRemove: '',
    hideButton: false,
    addResult: false,
    toggleResult: false,
};

ActionItems.propTypes = {
    sprintId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    addActionItem: PropTypes.func.isRequired,
    wrappedData: PropTypes.func.isRequired,
    onData: PropTypes.func.isRequired,
    toggleActionItem: PropTypes.func.isRequired,
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
    handlers: PropTypes.arrayOf(
        PropTypes.shape({
            subscriptionId: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    idToRemove: PropTypes.string,
    hideButton: PropTypes.bool,
    addResult: PropTypes.bool,
    toggleResult: PropTypes.bool,
    errorToggle: PropTypes.instanceOf(Error),
    errorAdd: PropTypes.instanceOf(Error),
};

export default ActionItems;
