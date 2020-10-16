<template>
  <div class="cart__wrapper card">
    <table class="cart__table">
      <thead class="header">
        <th class="header__cell cell__name">Наименование товара и описание</th>
        <th class="header__cell cell__count">Количество</th>
        <th class="header__cell cell__price">Цена</th>
        <th class="header__cell cell__action">&nbsp;</th>
      </thead>
      <tbody class="table__items">
        <tr
          v-is="'cart-item'"
          v-for="item of goods"
          :item="item"
          :key="item.id"
        ></tr>
        <tr v-if="isCartEmpty">
          <td colspan="4">Корзина пуста.</td>
        </tr>
      </tbody>
    </table>
    <div class="cart__total">
      <span class="label">Общая стоимость</span>
      <span class="value">{{ formattedTotal }}</span>
    </div>
  </div>
</template>

<script>
import { computed, readonly } from "vue";
import { useStore } from "vuex";

import CartItem from "@/components/CartItem";

export default {
  name: "Cart",

  components: {
    "cart-item": CartItem
  },

  setup() {
    const { getters } = useStore();

    const goods = readonly(getters.cart);

    const isCartEmpty = computed(() => goods.length === 0);
    const currency = computed(() => getters.currency);
    const totalPrice = computed(() =>
      goods.reduce(
        (accumulator, current) =>
          accumulator + current.price * currency.value * current.count,
        0
      )
    );
    const formattedTotal = computed(() => `${totalPrice.value.toFixed(2)} $`);

    return { goods, isCartEmpty, formattedTotal };
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

.cart__wrapper {
  &.card {
    margin-left: 1rem;
  }

  padding: 1rem;

  .cart__table {
    width: 100%;

    border-collapse: separate;
    border-spacing: 0 1rem;

    .header {
      .header__cell {
        &.cell__name {
          width: 60%;
        }
        &.cell__count {
          width: 10%;
        }
        &.cell__price {
          width: 20%;
        }
        &.cell__action {
          width: 10%;
        }
      }
    }

    .table__items {
      color: $secondary_text_color;
    }
  }

  .cart__total {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    text-align: end;

    margin-top: 2rem;
    padding-right: 1rem;
    font-size: 2rem;

    .label {
      font-weight: bold;
    }

    .value {
    }
  }
}
</style>
