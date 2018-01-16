export const state = () => ({
  breadcrumb: [
    {
      path: '/',
      title: '首页'
    }
  ]
});

export const mutations = {
  breadcrumb(state, json) {
    state.breadcrumb = json;
  }
};
