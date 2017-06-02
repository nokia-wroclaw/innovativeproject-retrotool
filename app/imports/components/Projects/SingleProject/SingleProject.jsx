import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardText,
} from 'material-ui';
import ActionItemsBoard from '/imports/components/ActionItems/ActionItemsBoard';
import WorkingAgreementBoard from '/imports/components/WorkingAgreements/WorkingAgreementBoard';
import ProjectMembers from '/imports/components/Projects/ProjectMembers';
import ProjectOverviewToolbar from './ProjectOverviewToolbar.jsx';

const SingleProject = ({
    projectId,
    name,
    isFavouriteProject,
    starProject,
    unstarProject,
}) => (
    <div className="project-overview">
        <ProjectOverviewToolbar
            projectName={name}
            projectId={projectId}
            isFavouriteProject={isFavouriteProject}
            starProject={starProject}
            unstarProject={unstarProject}
        />
        <div className="ai-wa-container">
            <div className="half">
                <ActionItemsBoard hideButton />
            </div>
            <div className="half">
                <WorkingAgreementBoard hideButton />
            </div>
        </div>
        <Card className="content-container">
            <CardText>
                <ProjectMembers projectId={projectId} />
            </CardText>
        </Card>
    </div>
);

SingleProject.propTypes = {
    projectId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isFavouriteProject: PropTypes.bool.isRequired,
    starProject: PropTypes.func.isRequired,
    unstarProject: PropTypes.func.isRequired,
};

SingleProject.defaultProps = {
    isFavouriteProject: false,
    starProject: () => {},
    unstarProject: () => {},
};

export default SingleProject;
