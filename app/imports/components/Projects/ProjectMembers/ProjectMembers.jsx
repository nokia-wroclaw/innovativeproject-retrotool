import React from 'react';
import PropTypes from 'prop-types';
import { GridTile, IconButton } from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete';
import { styles } from './style.js';

const ProjectMembers = ({
    users,
    isCurrentUserProjectModerator,
}) =>
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
                        onTouchTap={() => alert('x')}
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
    </div>
;

ProjectMembers.propTypes = {
    users: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isModerator: PropTypes.bool.isRequired,
    }).isRequired,
    isCurrentUserProjectModerator: PropTypes.bool.isRequired,
};

export default ProjectMembers;
