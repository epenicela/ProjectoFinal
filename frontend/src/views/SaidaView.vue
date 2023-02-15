<template>
  <Saida />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Saida from '../components/Saida.vue';

export default defineComponent({
  name: 'SaidaView',

  components: {
    Saida,
  },
});
</script>