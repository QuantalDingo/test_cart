const state = () => ({
  goods: {}
});

const getters = {
  getGoods: state => state.goods
};

const mutations = {
  setGoods(state, goods) {
    state.goods = goods;
  }
};

const actions = {
  async fetchGoodsList({ commit }) {
    const response = await fetch(`http://localhost:8000`);
    const goods = await response.json();

    commit("setGoods", goods);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
