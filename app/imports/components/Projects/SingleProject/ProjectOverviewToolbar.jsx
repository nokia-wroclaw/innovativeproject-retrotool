import React from 'react';
import PropTypes from 'prop-types';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarTitle,
    IconButton,
    RaisedButton,
} from 'material-ui';

import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const renderTitle = (
    projectId,
    projectName,
    isFavouriteProject,
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
    starProject,
    unstarProject,
    canEditCategories,
    goToCategoryManager,
}) =>
    <Toolbar>
        <ToolbarGroup>
            <ToolbarTitle
                text={renderTitle(
                    projectId,
                    projectName,
                    isFavouriteProject,
                    starProject,
                    unstarProject,
                )}
            />
        </ToolbarGroup>
        {canEditCategories &&
            <ToolbarGroup>
                <RaisedButton
                    label="Project Categories"
                    onTouchTap={() => goToCategoryManager(projectId)}
                />
            </ToolbarGroup>
        }
    </Toolbar>
;

ProjectOverviewToolbar.propTypes = {
    projectId: PropTypes.string.isRequired,
    isFavouriteProject: PropTypes.bool.isRequired,
    projectName: PropTypes.string.isRequired,
    starProject: PropTypes.func.isRequired,
    unstarProject: PropTypes.func.isRequired,
    canEditCategories: PropTypes.bool.isRequired,
    goToCategoryManager: PropTypes.func.isRequired,
};

export default ProjectOverviewToolbar;
