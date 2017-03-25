import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardText,
    FlatButton,
} from 'material-ui';

const Post = (props) => (
    <Card key={props.id}>
        {props.showAuthor ?
            <CardHeader
                title={props.author.name}
                avatar={props.author.avatar}
            />
            :
            <CardHeader
                title="Anonymous post"
            />
        }
        <CardText>
            {props.text}
        </CardText>
        <CardActions>
            <FlatButton
                label="Add comment"
                onTouchTap={() => {}}
            />
            <FlatButton
                label="See comments"
                onTouchTap={() => {}}
            />
        </CardActions>
    </Card>
);

export default Post;
