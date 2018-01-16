export const state = () => ({
  userinfo: null
});

export const mutations = {
  userinfo(state, userinfo) {
    state.userinfo = userinfo;
  }
};
