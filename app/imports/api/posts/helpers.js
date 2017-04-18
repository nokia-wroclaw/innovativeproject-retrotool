import _ from 'lodash';
import { Posts } from '/imports/api/posts';
import { Sprints } from '/imports/api/sprints';

export const getProjectIdByPostId = (postId) => {
    const sprintId = _.get(Posts.findOne(postId), 'sprintId', null);
    return sprintId && _.get(Sprints.findOne(sprintId), 'projectId', null);
};
