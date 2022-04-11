import _ from 'lodash';
import jsonPlaceHolder from '../apis/jsonPlaceHolder';
import { vanillaMemoize } from '../utils/util';

// -> Fetch Posts and Users
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach((id) => dispatch(fetchUser(id)));

  // Using chain to perform above task
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};

//-> Fetch Posts
export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceHolder.get('/posts');
  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

//-> Fetch User
// Sol 1 - using fetchPostAndUsers
// Get posts -> find unique userIds from list of posts -> iterate over those unique ids
//? Here we need to send request only if user does not exist
export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceHolder.get(`/users/${id}`);
  dispatch({ type: 'FETCH_USER', payload: response.data });
};

// Sol 2 - DRAWBACK (IF user data is changed we won't get the updated data since we won't request the server for user if user exists)
// USING MEMOIZE
//using lodash
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceHolder.get(`/users/${id}`);
//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });

//using vanillaMemoize
// const _fetchUser = vanillaMemoize(async (id, dispatch) => {
//   await jsonPlaceHolder.get(`/users/${id}`);
// });
