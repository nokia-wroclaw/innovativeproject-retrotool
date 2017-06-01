import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardActions,
    CardTitle,
    CardText,
} from 'material-ui';
import { CategoryChip } from './CategoryChip.jsx';
import { CategoryCreator } from './CategoryCreator.jsx';

const CategoriesManager = ({
    projectId,
    projectCategories,
    globalCategories,
    canEditGlobalCategories,
    canEditProjectCategories,
    addPostCategory,
    removePostCategory,
}) =>
    <div>
        <Card>
            <CardTitle
                title="Global Categories"
            />
            <CardText>
                {globalCategories.map(category =>
                    <CategoryChip
                        key={category.value}
                        value={category.value}
                        label={category.label}
                        onRequestDelete={removePostCategory}
                    />,
                )}
            </CardText>
            {canEditGlobalCategories &&
                <CardActions>
                    <CategoryCreator
                        onAdd={addPostCategory}
                    />
                </CardActions>
            }
        </Card>

        {projectId &&
            <Card>
                <CardTitle
                    title="Project Categories"
                />
                <CardText>
                    {projectCategories.map(CategoryChip)}
                </CardText>
                {canEditProjectCategories &&
                    <CardActions>
                        <CategoryCreator
                            projectId={projectId}
                            onAdd={addPostCategory}
                        />
                    </CardActions>
                }
            </Card>
        }
    </div>
;

const categoryPropTypes = PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}).isRequired;

CategoriesManager.propTypes = {
    projectId: PropTypes.string,
    canEditGlobalCategories: PropTypes.bool.isRequired,
    canEditProjectCategories: PropTypes.bool.isRequired,
    globalCategories: PropTypes.arrayOf(categoryPropTypes).isRequired,
    projectCategories: PropTypes.arrayOf(categoryPropTypes).isRequired,
    addPostCategory: PropTypes.func.isRequired,
    removePostCategory: PropTypes.func.isRequired,
};

CategoriesManager.defaultProps = {
    projectId: '',
    globalCategories: [],
    projectCategories: [],
    canEditGlobalCategories: false,
    canEditProjectCategories: false,
    addPostCategory() {},
    removePostCategory() {},
};

export default CategoriesManager;
