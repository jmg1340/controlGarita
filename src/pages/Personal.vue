<template>
  <q-page >

		<jmg_formulariP class=""/>
		<jmg_llistaP />



  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import jmg_formulariP from '../components/formulariP.vue';
import jmg_llistaP from '../components/llistaP.vue';

export default defineComponent({
  name: 'PageIndex',
	components: { jmg_formulariP, jmg_llistaP }
})
</script>
