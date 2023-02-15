<template>
  <Entrada />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Entrada from '../components/Entrada.vue';

export default defineComponent({
  name: 'EntradaView',

  components: {
    Entrada,
  },
});
</script>