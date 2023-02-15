<template>
  <Vacina />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Vacina from '../components/Vacina.vue';

export default defineComponent({
  name: 'VacinaView',

  components: {
    Vacina,
  },
});
</script>