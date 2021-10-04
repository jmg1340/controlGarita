<template>
  <q-page >


		<jmg_formulari class=""/>
		<jmg_llista />



  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import jmg_formulari from '../components/formulariES.vue';
import jmg_llista from '../components/llistaES.vue';

export default defineComponent({
  name: 'PageIndex',
	components: { jmg_formulari, jmg_llista }
})
</script>
