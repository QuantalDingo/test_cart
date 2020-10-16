<template>
  <tr class="row">
    <td class="cell cell__name">{{ item.name }}</td>
    <td class="cell cell__count">{{ item.count }}</td>
    <td class="cell cell__price">{{ formattedPrice }}</td>
    <td class="cell cell__action">
      <button
        title="Удалить"
        class="btn btn-delete"
        @click="handleDelete(item.id)"
      >
        <fa-icon :icon="['far', 'trash-alt']" />
      </button>
    </td>
  </tr>
</template>

<script>
import { toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "CarItem",

  props: {
    item: {
      type: Object
    }
  },

  setup(props) {
    const { item } = toRefs(props);

    const { getters, dispatch } = useStore();

    const currency = computed(() => getters.currency);
    const price = computed(() => item.value.price * currency.value);
    const formattedPrice = computed(() => `${price.value.toFixed(2)} $ / шт.`);

    function handleDelete(id) {
      dispatch("deleteItemFromCart", id);
    }

    return { item, formattedPrice, handleDelete };
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

.row {
  .cell {
    &.cell__name {
      width: 60%;
    }

    &.cell__count {
      width: 10%;
    }

    &.cell__price {
      width: 20%;
      text-align: end;
    }

    &.cell__action {
      width: 10%;

      .btn-delete {
        font-size: 1.33rem;

        &:hover {
          color: $secondary;
        }

        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
