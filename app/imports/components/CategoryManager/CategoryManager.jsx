import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardActions,
    CardTitle,
    CardText,
    Chip,
    FlatButton,
} from 'material-ui';

const CategoriesManager = ({
    projectId,
    projectCategories,
    globalCategories,
    canEditGlobalCategories,
    canEditProjectCategories,
}) =>
    <div>
        Project Manager

        <Card>
            <CardTitle
                title="Global Categories"
            />
            <CardText>
                {globalCategories.map(category =>
                    <Chip key={category.value}>{category.label}</Chip>,
                )}
            </CardText>
            {canEditGlobalCategories &&
                <CardActions>
                    <FlatButton
                        label="Add category"
                        onTouchTap={() => {}}
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
                    {projectCategories.map(category =>
                        <Chip className="chip-style" key={category.value}>{category.label}</Chip>,
                    )}
                </CardText>
                {canEditProjectCategories &&
                    <CardActions>
                        <FlatButton
                            label="Add category"
                            onTouchTap={() => {}}
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
};

CategoriesManager.defaultProps = {
    projectId: '',
    globalCategories: [],
    projectCategories: [],
    canEditGlobalCategories: false,
    canEditProjectCategories: false,
};

export default CategoriesManager;
