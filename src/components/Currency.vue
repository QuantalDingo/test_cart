<template>
  <div class="currency__wrapper">
    <h4 class="currency__header">Курс доллара</h4>
    <div class="currency__editor">
      <span class="editor">
        <span class="editor__text" v-if="!isChanging">
          {{ formattedCurrency }}
        </span>
        <input
          v-if="isChanging"
          class="editor__input"
          v-model.lazy="currency"
        />
      </span>
      <button
        title="Изменить курс"
        class="btn btn-edit"
        @click="isChanging = !isChanging"
      >
        <fa-icon :icon="['fas', 'pen']"></fa-icon>
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "Currency",
  setup() {
    const { getters, dispatch } = useStore();

    const isChanging = ref(false);

    const currency = computed({
      get: () => getters.currency,
      set: value => dispatch("changeCurrency", value)
    });
    const formattedCurrency = computed(() => `$ ${currency.value}`);

    return { currency, formattedCurrency, isChanging };
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

.currency__wrapper {
  margin: 0 auto;

  .currency__header {
  }

  .currency__editor {
    width: 8rem;
    display: flex;
    align-items: center;

    .editor {
      display: inline-block;
      flex: 80% 0 1;

      .editor__text {
        font-size: 2rem;
        color: $secondary_text_color;
      }

      .editor__input {
        padding: 0;

        font-size: 2rem;
        text-align: center;
        color: $secondary_text_color;

        width: 100%;
        height: 2.5rem;

        border-width: 0;
        border-radius: 0.5rem;
      }
    }

    .btn-edit {
      font-size: 1rem;
      padding: 0.75rem;
      border-radius: 0.5rem;
      color: $button_text;
      background-color: $edit_button;

      &:hover {
        background-color: $edit_button_hover;
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 4px $edit_button_focus;
      }
    }
  }
}
</style>
