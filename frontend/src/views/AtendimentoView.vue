<template>
  <Atendimento />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Atendimento from '../components/Atendimento.vue';

export default defineComponent({
  name: 'AtendimentoView',

  components: {
    Atendimento,
  },
});
</script>