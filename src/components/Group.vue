<template>
  <div class="group__wrapper">
    <div class="card" v-for="(items, group_name) in goods" :key="group_name">
      <h4>{{ group_name }}</h4>
      <GroupItem
        v-for="(item, index) of items"
        :key="index"
        :item="item"
      ></GroupItem>
    </div>
  </div>
</template>

<script>
import GroupItem from "@/components/GroupItem";

import { useStore } from "vuex";
import { computed, onBeforeUnmount, onMounted } from "vue";

export default {
  name: "Group",

  components: {
    GroupItem
  },

  setup() {
    const { dispatch, getters } = useStore();

    const goods = computed(() => getters.goods);
    const pollingRef = null;

    function polling() {
      setInterval(() => dispatch("fetchGoodsList"), 15000);
    }

    function closePolling() {
      clearInterval(pollingRef);
    }

    onMounted(() => dispatch("fetchGoodsList"));
    onMounted(() => polling());
    onBeforeUnmount(() => closePolling());

    return { goods };
  }
};
</script>

<style lang="scss">
@import "../styles/variables";

.group__wrapper {
  display: grid;
  gap: 1rem;
}
</style>
