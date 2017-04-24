import React from 'react';
import PropTypes from 'prop-types';
import SprintToolbar from './SprintToolbar.jsx';
import CloseDialog from './CloseDialog.jsx';

class SingleSprint extends React.Component {
    constructor(props) {
        super(props);
        this.showCloseDialog = this.showCloseDialog.bind(this);
        this.hideCloseDialog = this.hideCloseDialog.bind(this);

        this.state = {
            showCloseDialog: false,
        };
    }

    showCloseDialog() {
        this.setState({ showCloseDialog: true });
    }

    hideCloseDialog() {
        this.setState({ showCloseDialog: false });
    }

    render() {
        const { showCloseDialog } = this.state;

        const {
            sprint,
            toggleSprint,
            canClose,
        } = this.props;

        return (
            <div>
                <SprintToolbar
                    sprint={sprint}
                    closeSprint={this.showCloseDialog}
                    canClose={canClose}
                />

                <CloseDialog
                    sprint={sprint}
                    toggleSprint={toggleSprint}
                    canClose={canClose}
                    open={showCloseDialog}
                    onClose={this.hideCloseDialog}
                />
            </div>
        );
    }
}


SingleSprint.propTypes = {
    sprint: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    toggleSprint: PropTypes.func.isRequired,
    canClose: PropTypes.bool.isRequired,
};

SingleSprint.defaultProps = {
    canClose: false,
};

export default SingleSprint;
