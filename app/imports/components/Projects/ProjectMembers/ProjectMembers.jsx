import React from 'react';
import PropTypes from 'prop-types';
import { GridTile, IconButton } from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import { styles } from './styles.js';
import RemoveMember from './RemoveMember.jsx';

class ProjectMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openRemoveModal: false,
            selectedUser: {},
        };
        this.openRemoveModal = this.openRemoveModal.bind(this);
        this.closeRemoveModal = this.closeRemoveModal.bind(this);
    }

    openRemoveModal(id, name) {
        this.setState({
            openRemoveModal: true,
            selectedUser: {
                id,
                name,
            },
        });
    }

    closeRemoveModal() {
        this.setState({
            openRemoveModal: false,
            selectedUser: {},
        });
    }

    render() {
        const {
            projectId,
            users,
            isCurrentUserProjectModerator,
            removeMember,
        } = this.props;
        const {
            openRemoveModal,
            selectedUser,
        } = this.state;

        return (
            <div className="users-container">
                {users.map(user => (
                    <GridTile
                        key={user.id}
                        title={user.name}
                        subtitle={user.isModerator ? 'Moderator' : ''}
                        titleStyle={styles.titleStyle}
                        style={styles.GridTile}
                        titleBackground="linear-gradient(
                            to top,
                            rgba(0,0,0,0.7) 0%,
                            rgba(0,0,0,0.3) 70%,
                            rgba(0,0,0,0) 100%
                        )"
                        actionIcon={isCurrentUserProjectModerator &&
                            <IconButton
                                onTouchTap={() => this.openRemoveModal(user.id, user.name)}
                            >
                                <Delete color="white" />
                            </IconButton>
                        }
                    >
                        <img
                            src={user.avatar}
                            alt={user.name}
                        />
                    </GridTile>
                ))}

                {isCurrentUserProjectModerator &&
                    <GridTile
                        title="Add new member"
                        titleStyle={styles.titleStyle}
                        style={styles.GridTile}
                        titleBackground="linear-gradient(
                            to top,
                            rgba(0,0,0,0.7) 0%,
                            rgba(0,0,0,0.3) 70%,
                            rgba(0,0,0,0) 100%
                        )"
                    >
                        <PersonAdd style={styles.personAdd} />
                    </GridTile>
                }

                <RemoveMember
                    id={selectedUser.id}
                    name={selectedUser.name}
                    open={openRemoveModal}
                    onCancel={this.closeRemoveModal}
                    onConfirm={() => {
                        removeMember(projectId, selectedUser.id);
                        this.closeRemoveModal();
                    }}

                />
            </div>
        );
    }
}

ProjectMembers.propTypes = {
    projectId: PropTypes.string.isRequired,
    users: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isModerator: PropTypes.bool.isRequired,
    }).isRequired,
    removeMember: PropTypes.func.isRequired,
    isCurrentUserProjectModerator: PropTypes.bool.isRequired,
};

export default ProjectMembers;
