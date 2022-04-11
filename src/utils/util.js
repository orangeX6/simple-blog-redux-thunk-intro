export const vanillaMemoize = (fn) => {
  let cache = new Map();
  return (x, dispatch) => {
    if (cache.has(x)) return cache.get(x);

    let result = fn(x);
    cache.set(x, result);
    dispatch({ type: 'FETCH_USER', payload: result });
    return result;
  };
};
// USAGE
/*
function getUser(id) {
  fetch(id);
  return 'made a request';
}

const userMemo = vanillaMemoize(getUser);
userMemo(5);
*/
