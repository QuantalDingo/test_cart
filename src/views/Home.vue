<template>
  <div class="home">
    <Group class="group"></Group>
    <Currency class="currency"></Currency>
    <Cart class="cart"></Cart>
  </div>
</template>

<script>
// @ is an alias to /src
import Cart from "@/components/Cart";
import Group from "@/components/Group";
import Currency from "@/components/Currency";

export default {
  name: "Home",
  components: { Group, Cart, Currency }
};
</script>

<style lang="scss" scoped>
@import "../styles/_general.scss";
</style>
