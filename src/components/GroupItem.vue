<template>
  <div class="item">
    <span class="item__name">{{ name }}</span>
    <span class="item__count">{{ count }}</span>
    <span class="item__price" :class="[changedPriceClass]">
      {{ formattedPrice }}
    </span>
    <span class="item__button">
      <button
        title="Добавить в корзину"
        class="btn btn-cart"
        @click="handleClick(item)"
      >
        В корзину
      </button>
    </span>
  </div>
</template>

<script>
import { computed, toRefs, watch, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "GroupItem",

  props: {
    item: {
      type: Object
    }
  },

  setup(props) {
    const { dispatch, getters } = useStore();

    const { item } = toRefs(props);
    const changedPriceClass = ref("");

    const name = computed(() => item.value.name);
    const count = computed(() => `${item.value.count} шт.`);
    const currency = computed(() => getters.currency);
    const price = computed(() => item.value.price * currency.value);
    const formattedPrice = computed(() => `${price.value.toFixed(2)} $`);

    watch(price, (currPrice, prevPrice) => {
      if (currPrice > prevPrice) {
        changedPriceClass.value = "price-up";
      } else if (currPrice < prevPrice) {
        changedPriceClass.value = "price-down";
      } else {
        changedPriceClass.value = "";
      }
    });

    function handleClick(item) {
      dispatch("addItemToCart", { ...item, count: 1 });
    }

    return {
      item,
      name,
      count,
      formattedPrice,
      handleClick,
      changedPriceClass
    };
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

.item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: baseline;

  margin: 1rem;

  color: $secondary_text_color;

  .item__name {
    flex-basis: 50%;
  }
  .item__count {
    flex-basis: 10%;
  }

  .item__price {
    flex-basis: 20%;

    &.price-up {
      color: $secondary;
    }
    &.price-down {
      color: #1ea51e;
    }
  }

  .item__button {
    flex-basis: 20%;

    .btn-cart {
      background-color: $cart_button;
      color: $button_text;
      border-radius: 0.5rem;
      padding: 0.5rem 1.33rem;

      &:hover {
        background-color: $cart_button_hover;
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 4px $cart_button_focus;
      }
    }
  }
}
</style>
