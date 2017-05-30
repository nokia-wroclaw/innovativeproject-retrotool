import React from 'react';
import PropTypes from 'prop-types';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {
    GridTile,
    IconButton,
} from 'material-ui';

import ActionItemsBoard from '/imports/components/ActionItems/ActionItemsBoard';
import WorkingAgreementBoard from '/imports/components/WorkingAgreements/WorkingAgreementBoard';
import { styles } from './style.js';

const SingleProject = ({
    projectId,
    name,
    isFavouriteProject,
    starProject,
    unstarProject,
    userList,
    isProjectModerator,
}) => (
    <div>
        <div className="content-container">
            <h1>
                {isFavouriteProject ?
                    <IconButton
                        onTouchTap={() => unstarProject(projectId)}
                    >
                        <Star />
                    </IconButton>
                    :
                    <IconButton
                        onTouchTap={() => starProject(projectId)}
                    >
                        <StarBorder />
                    </IconButton>
                }
                {name}
            </h1>

            <div className="users-container">
                {userList.map(user => (
                    <GridTile
                        key={user._id}
                        title={user.profile.name}
                        subtitle={isProjectModerator(projectId, user._id) ? 'Moderator' : ''}
                        titleStyle={styles.titleStyle}
                        style={styles.GridTile}
                        titleBackground="linear-gradient(
                            to top,
                            rgba(0,0,0,0.7) 0%,
                            rgba(0,0,0,0.3) 70%,
                            rgba(0,0,0,0) 100%
                        )"
                    >
                        <img
                            src={user.profile.avatar}
                            alt={user.profile.name}
                        />
                    </GridTile>
                ))}
            </div>
        </div>

        <div className="half">
            <ActionItemsBoard hideButton />
        </div>
        <div className="half">
            <WorkingAgreementBoard hideButton />
        </div>
    </div>
);

SingleProject.propTypes = {
    projectId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isFavouriteProject: PropTypes.bool.isRequired,
    starProject: PropTypes.func.isRequired,
    unstarProject: PropTypes.func.isRequired,
    isProjectModerator: PropTypes.func.isRequired,
    userList: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired,
        profile: PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }).isRequired,
    })).isRequired,
};

SingleProject.defaultProps = {
    isFavouriteProject: false,
    starProject: () => {},
    unstarProject: () => {},
};

export default SingleProject;
