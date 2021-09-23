<template>
  <q-page >


		<jmg_formulari class=""/>
		<jmg_llista />



  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import jmg_formulari from '../components/formulari.vue';
import jmg_llista from '../components/llista.vue';

export default defineComponent({
  name: 'PageIndex',
	components: { jmg_formulari, jmg_llista }
})
</script>
