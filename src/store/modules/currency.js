const state = () => ({
  currency: 20
});

const getters = {
  getCurrency: state => state.currency
};

const mutations = {
  setCurrency(state, payload) {
    state.currency = payload;
  }
};

const actions = {
  changeCurrency({ commit }, value) {
    commit("setCurrency", value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
