import React from 'react';
import PropTypes from 'prop-types';
import {
    RaisedButton,
    Toolbar,
    ToolbarGroup,
    ToolbarTitle,
    IconButton,
} from 'material-ui';

import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const renderTitle = (
    projectId,
    projectName,
    isFavouriteProject,
    goToProjectMembers,
    starProject,
    unstarProject,
) =>
    <div>
        {projectName}
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
    </div>
;

const ProjectOverviewToolbar = ({
    projectId,
    projectName,
    isFavouriteProject,
    goToProjectMembers,
    starProject,
    unstarProject,
}) =>
    <Toolbar>
        <ToolbarGroup>
            <ToolbarTitle
                text={renderTitle(
                    projectId,
                    projectName,
                    isFavouriteProject,
                    goToProjectMembers,
                    starProject,
                    unstarProject,
                )}
            />
        </ToolbarGroup>
        <ToolbarGroup>
            <RaisedButton
                primary
                label="Members"
                onTouchTap={goToProjectMembers}
            />
        </ToolbarGroup>
    </Toolbar>
;

ProjectOverviewToolbar.propTypes = {
    projectId: PropTypes.string.isRequired,
    isFavouriteProject: PropTypes.bool.isRequired,
    projectName: PropTypes.string.isRequired,
    goToProjectMembers: PropTypes.func.isRequired,
    starProject: PropTypes.func.isRequired,
    unstarProject: PropTypes.func.isRequired,
};

export default ProjectOverviewToolbar;
