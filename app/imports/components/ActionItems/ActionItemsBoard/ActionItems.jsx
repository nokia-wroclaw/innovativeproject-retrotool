import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import ActionItemsToolbar from './ActionItemsToolbar.jsx';
import ActionItem from './ActionItem.jsx';
import AddActionItem from '../AddActionItem';
import CloseOrReopenActionItem from '../CloseOrReopenActionItem';


class ActionItems extends React.Component {
    constructor(props) {
        super(props);

        this.showAddActionItemModal = this.showAddActionItemModal.bind(this);
        this.hideAddActionItemModal = this.hideAddActionItemModal.bind(this);
        this.addActionItem = this.addActionItem.bind(this);

        this.showToggleActionItemModal = this.showToggleActionItemModal.bind(this);
        this.hideToggleActionItemModal = this.hideToggleActionItemModal.bind(this);
        this.toggleModalActionItem = this.toggleModalActionItem.bind(this);

        this.onChangeCategory = this.onChangeCategory.bind(this);

        this.state = {
            showAddActionItemModal: false,
            showToggleActionItemModal: false,
            actionItemId: '',
            selectedState: 'all',
            isOpen: false,
        };
    }

    componentWillReceiveProps(props) {
        if (!props.errorAdd && props.openSnackbar) {
            this.hideAddActionItemModal();
        }
        if (!props.errorToggle && props.openToggleSnackbar) {
            this.hideToggleActionItemModal();
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

    showToggleActionItemModal(actionItemId, isOpen) {
        this.setState({
            showToggleActionItemModal: true,
            actionItemId,
            isOpen,
        });
    }

    hideToggleActionItemModal() {
        this.setState({ showToggleActionItemModal: false });
    }

    addActionItem(doc) {
        const {
            addActionItem,
            sprintId,
            onData,
            handlers,
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
            wrappedData,
        );
    }

    toggleModalActionItem(doc) {
        const {
            toggleActionItem,
            sprintId,
            onData,
            handlers,
            wrappedData,
        } = this.props;

        const { actionItemId } = this.state;

        toggleActionItem(
            actionItemId,
            doc.closeMessage,
            onData,
            sprintId,
            handlers,
            wrappedData,
        );
    }

    render() {
        const {
            showAddActionItemModal,
            showToggleActionItemModal,
            selectedState,
            isOpen,
        } = this.state;

        const {
            actionItems,
            isMember,
            isModerator,
            errorToggle,
            idToRemove,
            isClosed,
            errorAdd,
            openSnackbar,
            openToggleSnackbar,
            closeSnackBar,
            sprintId,
            onData,
            handlers,
            wrappedData,
        } = this.props;

        return (
            <div>
                <ActionItemsToolbar
                    addActionItem={this.showAddActionItemModal}
                    onChangeCategory={this.onChangeCategory}
                    selectedState={selectedState}
                    isMember={isMember}
                    isClosed={isClosed}
                />

                {actionItems
                    .filter(ai => ai.open.toString() === selectedState || selectedState === 'all')
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
                            toggleActionItem={() => this.showToggleActionItemModal(_id, open)}
                            isModerator={isModerator}
                            idToRemove={idToRemove}
                            sprintId={sprintId}
                            onData={onData}
                            handlers={handlers}
                            wrappedData={wrappedData}
                        />,
                )}

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
                />

                <Snackbar
                    open={openSnackbar}
                    message="New action item has been added!"
                    autoHideDuration={4000}
                    onRequestClose={() => closeSnackBar(sprintId, onData, handlers, wrappedData)}
                />

                <Snackbar
                    open={openToggleSnackbar}
                    message="Changes saved!"
                    autoHideDuration={4000}
                    onRequestClose={() => closeSnackBar(sprintId, onData, handlers, wrappedData)}
                />
            </div>
        );
    }
}

ActionItems.defaultProps = {
    errorToggle: null,
    errorAdd: null,
    idToRemove: '',
    openSnackbar: false,
    openToggleSnackbar: false,
};

ActionItems.propTypes = {
    sprintId: PropTypes.string.isRequired,
    addActionItem: PropTypes.func.isRequired,
    closeSnackBar: PropTypes.func.isRequired,
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
    openSnackbar: PropTypes.bool,
    openToggleSnackbar: PropTypes.bool,
    errorToggle: PropTypes.instanceOf(Error),
    errorAdd: PropTypes.instanceOf(Error),
};

export default ActionItems;
