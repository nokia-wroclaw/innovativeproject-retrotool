import React from 'react';
import PropTypes from 'prop-types';
import { GridTile } from 'material-ui';
import ActionItemsBoard from '/imports/components/ActionItems/ActionItemsBoard';
import WorkingAgreementBoard from '/imports/components/WorkingAgreements/WorkingAgreementBoard';
import ProjectOverviewToolbar from './ProjectOverviewToolbar.jsx';
import { styles } from './style.js';

const renderUserList = (userList, isProjectModerator, projectId) =>
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
;

const SingleProject = ({
    projectId,
    name,
    userList,
    isProjectModerator,
    isFavouriteProject,
    starProject,
    unstarProject,
    goToProjectMembers,
}) => (
    <div className="project-overview">
        <ProjectOverviewToolbar
            projectName={name}
            projectId={projectId}
            isFavouriteProject={isFavouriteProject}
            starProject={starProject}
            unstarProject={unstarProject}
            goToProjectMembers={goToProjectMembers}
        />
        <div className="ai-wa-container">
            <div className="half">
                <ActionItemsBoard hideButton />
            </div>
            <div className="half">
                <WorkingAgreementBoard hideButton />
            </div>
        </div>
        <div className="content-container">
            {renderUserList(userList, isProjectModerator, projectId)}
        </div>
    </div>
);

SingleProject.propTypes = {
    projectId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isFavouriteProject: PropTypes.bool.isRequired,
    starProject: PropTypes.func.isRequired,
    unstarProject: PropTypes.func.isRequired,
    goToProjectMembers: PropTypes.func.isRequired,
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
