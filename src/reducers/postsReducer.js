// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  // if (action.type === 'FETCH_POSTS') {
  //   return action.payload;
  // }
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;
    default:
      return state;
  }
};
