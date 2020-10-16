const state = () => ({
  cart: []
});

const getters = {
  getCart: state => state.cart
};
const mutations = {
  pushToCart(state, item) {
    const existingElemIndex = state.cart.findIndex(elem => elem.id === item.id);

    if (~existingElemIndex) {
      state.cart[existingElemIndex].count++;
    } else {
      state.cart.push(item);
    }
  },
  deleteFromCart(state, id) {
    const existingElemIndex = state.cart.findIndex(elem => elem.id === id);

    state.cart.splice(existingElemIndex, 1);
  }
};

const actions = {
  addItemToCart({ commit }, item) {
    commit("pushToCart", item);
  },
  deleteItemFromCart({ commit }, id) {
    commit("deleteFromCart", id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
