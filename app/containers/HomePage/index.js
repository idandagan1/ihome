/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import { Grid, AppBar, Tabs, Tab } from '@material-ui/core';
import List from 'components/ListComponent';
import Add from 'components/AddComponent';
import { addItem, getList, deleteItem } from './actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage, { makeSelectTodoList } from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {

      state = {
        value: 0,
        toDoList: [],
        toBuyList: [],
      };

      componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getList('toDoList'));
        dispatch(getList('toBuyList'));
      }

    @autobind
      handleAddItem(listId, item) {
        const { dispatch } = this.props;
        dispatch(addItem(listId, item));
      }

    @autobind
    handleChange(event, value) {
      this.setState({ value });
    }

    @autobind
    handleDeleteItem(listId, itemId) {
      const { dispatch } = this.props;
      dispatch(deleteItem(listId, itemId));
    }

    renderToBuy() {
      const { toBuyList } = this.state;
      return (
        <Grid
          direction="column"
          spacing={8}
          container
        >
          <Grid item>
            <Add
              addItem={this.handleAddItem}
              listId="toBuyList"
              placeholder="Milk, apples, etc..."
            />
          </Grid>
          <Grid item>
            <List
              deleteItem={this.handleDeleteItem}
              listId="toBuyList"
              list={toBuyList}
            />
          </Grid>
        </Grid>
      );
    }

    renderToDo() {
      const { toDoList } = this.state;
      return (
        <Grid
          direction="column"
          spacing={8}
          container
        >
          <Grid item>
            <Add
              addItem={this.handleAddItem}
              listId="toDoList"
              placeholder="Order from Amazon..."
            />
          </Grid>
          <Grid item>
            <List
              deleteItem={this.handleDeleteItem}
              listId="toDoList"
              list={toDoList}
            />
          </Grid>
        </Grid>
      );
    }

    renderTabs = tab => {
      switch (tab) {
        case 0:
          return this.renderToDo();
        case 1:
          return this.renderToBuy();
        default:
          return this.renderToDo();
      }
    };

    render() {
      const { value } = this.state;

      return (
        <div>
          <Helmet>
            <title>HomePage</title>
            <meta
              name="description"
              content="Description of HomePage"
            />
          </Helmet>
          <AppBar position="static">
            <Tabs
              fullWidth
              value={value}
              onChange={this.handleChange}
            >
              <Tab
                ms={6}
                label="To Do"
              />
              <Tab
                ms={6}
                label="To Buy"
              />
            </Tabs>
          </AppBar>
          {
            this.renderTabs(value)
          }
        </div>
      );
    }

}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage(),
  toDoList: makeSelectTodoList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage);
