import React from 'react';
import {List, Grid, Typography, ListItem, Button} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});


class ListComponent extends React.PureComponent {

    onDeleteItem = (listId, itemId) => {
        const {deleteItem} = this.props;
        deleteItem(listId, itemId);
    };

    renderItem = ({ id, value}, key) => {
        const {classes, listId} = this.props;

        return (
            <ListItem key={`list-${key}-${id}`}>
                <Grid justify="space-between" alignItems="center" container>
                    <Grid item>
                        <Typography variant="subheading">{value}</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={() => this.onDeleteItem(listId, id)}
                            variant="fab"
                            aria-label="Delete"
                            className={classes.button}>
                            <DeleteIcon/>
                        </Button>
                    </Grid>
                </Grid>
            </ListItem>
        )
    };

    render() {
        const {classes, list} = this.props;
        return (
            <List className={classes.root} subheader={<li/>}>
                {
                    list.map(this.renderItem)
                }
            </List>
        )
    }
}

ListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    listId: PropTypes.string.isRequired,
};

export default withStyles(styles)(ListComponent);