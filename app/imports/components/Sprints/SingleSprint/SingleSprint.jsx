import React, { PropTypes } from 'react';
import SprintToolbar from './SprintToolbar.jsx';
import CloseDialog from './CloseDialog.jsx';

class SingleSprint extends React.Component {
    constructor(props) {
        super(props);
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
            project,
            toggleSprint,
            isProjectModerator,
            userId,
        } = this.props;

        const isModerator = isProjectModerator(project, userId);

        return (
            <div>
                <SprintToolbar
                    sprint={sprint}
                    closeSprint={() => this.showCloseDialog()}
                    isModerator={isModerator}
                />

                <CloseDialog
                    sprint={sprint}
                    toggleSprint={toggleSprint}
                    isModerator={isModerator}
                    open={showCloseDialog}
                    onClose={() => this.hideCloseDialog()}
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
    project: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    toggleSprint: PropTypes.func.isRequired,
    isProjectModerator: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
};

export default SingleSprint;
