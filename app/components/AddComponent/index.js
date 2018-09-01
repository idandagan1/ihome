/**
 *
 * AddComponent
 *
 */

import React from "react";
import { Grid, Button, Input } from "@material-ui/core";
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
});


/* eslint-disable react/prefer-stateless-function */
class AddComponent extends React.PureComponent {
    state = {
        input: '',
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onAddClick = () => {
        const { input } = this.state;
        const { addItem, listId } = this.props;
        addItem(listId, input);
        this.setState({ input: '' });
    };

    render() {
        const { input } = this.state;
        const { classes, placeholder } = this.props;

        return (
            <Grid spacing={8} alignItems="center" container>
                <Grid item>
                    <Input
                        id="add-items"
                        name="input"
                        label="item"
                        multiline={false}
                        value={input}
                        placeholder={placeholder}
                        className={classes.textField}
                        onChange={this.onChange}
                    />
                </Grid>
                <Grid item>
                    <Button
                        onClick={this.onAddClick}
                        variant="fab" color="primary" aria-label="Add" className={classes.button}>
                        <Add />
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

AddComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    placeholder: PropTypes.string.isRequired,
    addItem: PropTypes.func.isRequired,
    listId: PropTypes.string.isRequired,
};

export default withStyles(styles)(AddComponent);
