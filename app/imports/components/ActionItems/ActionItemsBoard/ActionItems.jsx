import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import ActionItemsToolbar from './ActionItemsToolbar.jsx';
import ActionItem from './ActionItem.jsx';
import AddActionItem from '../AddActionItem';


class ActionItems extends React.Component {
    constructor(props) {
        super(props);

        this.showAddActionItemModal = this.showAddActionItemModal.bind(this);
        this.hideAddActionItemModal = this.hideAddActionItemModal.bind(this);
        this.addActionItem = this.addActionItem.bind(this);

        this.state = {
            showAddActionItemModal: false,
        };
    }

    componentWillReceiveProps(props) {
        if (!props.errorAdd && props.openSnackbar) {
            this.hideAddActionItemModal();
        }
    }

    showAddActionItemModal() {
        this.setState({ showAddActionItemModal: true });
    }

    hideAddActionItemModal() {
        this.setState({
            showAddActionItemModal: false,
        });
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

    render() {
        const {
            showAddActionItemModal,
        } = this.state;

        const {
            actionItems,
            toggleActionItem,
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
                <ActionItemsToolbar
                    addActionItem={this.showAddActionItemModal}
                    isMember={isMember}
                    isClosed={isClosed}
                />

                {actionItems.map(ai =>
                    <ActionItem
                        key={ai._id}
                        id={ai._id}
                        text={ai.text}
                        startDate={ai.startDate}
                        endDate={ai.endDate}
                        open={ai.open}
                        assignee={ai.assignee}
                        toggleActionItem={toggleActionItem}
                        isModerator={isModerator}
                        errorRemove={errorRemove}
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

                <Snackbar
                    open={openSnackbar}
                    message="New action item has been added!"
                    autoHideDuration={4000}
                    onRequestClose={() => closeSnackBar(sprintId, onData, handlers, wrappedData)}
                />
            </div>
        );
    }
}

ActionItems.defaultProps = {
    errorRemove: null,
    errorAdd: null,
    idToRemove: '',
    openSnackbar: false,
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
    errorRemove: PropTypes.instanceOf(Error),
    errorAdd: PropTypes.instanceOf(Error),
};

export default ActionItems;
