const initialState = { users: [] };

export default function UsersReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_LOADING":
      return {
        loading: true,
        users: [],
      };
    case "USER_SUCCESS":
      return {
        loading: false,
        users: action.payload,
      };
    default:
      return state;
  }
}
