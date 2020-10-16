import { createStore } from "vuex";

export default createStore({
  state: {
    currency: 20,
    cart: [],
    goods: {}
  },
  getters: {
    currency: state => state.currency,
    cart: state => state.cart,
    goods: state => state.goods
  },
  mutations: {
    setCurrency(state, payload) {
      state.currency = payload;
    },
    pushToCart(state, item) {
      const existingElemIndex = state.cart.findIndex(
        elem => elem.id === item.id
      );

      if (~existingElemIndex) {
        state.cart[existingElemIndex].count++;
      } else {
        state.cart.push(item);
      }
    },
    deleteFromCart(state, id) {
      const existingElemIndex = state.cart.findIndex(elem => elem.id === id);

      state.cart.splice(existingElemIndex, 1);
    },
    setGoods(state, goods) {
      state.goods = goods;
    }
  },
  actions: {
    changeCurrency({ commit }, value) {
      commit("setCurrency", value);
    },
    addItemToCart({ commit }, item) {
      commit("pushToCart", item);
    },
    deleteItemFromCart({ commit }, id) {
      commit("deleteFromCart", id);
    },
    async fetchGoodsList({ commit }) {
      const response = await fetch(`http://localhost:8000`);
      const goods = await response.json();

      commit("setGoods", goods);
    }
  },
  modules: {}
});
