function sysReducer(state, action) {
  switch (action.type) {
    case "login": {
      let newUser = action.payload.user;
      return { ...state, user: newUser, isLogin: true };
    }
    case "SET_POSTS": {
      let newPost = action.payload.posts;
      return { ...state, posts: newPost };
    }
    case "IS_LOGIN": {
      let isLogin = action.payload.isLogin;
      return { ...state, isLogin: isLogin };
    }
  }
}

export default sysReducer;
