<template>
  <div class="q-pa-md" style="width: 100%">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >

			<div class="row items-between q-gutter-xs">


				<q-input
					class="col"
					outlined
					stack-label
					dense
					type="text"
					v-model="nom"
					label="nom"
					lazy-rules
					:rules="[
						val => val !== null && val !== '' || 'Escriu un nom',
					]"
				/>

				<q-input
					class="col"
					outlined
					stack-label
					dense
					type="text"
					v-model="matricula"
					label="matricula"
				/>

				<q-input
					class="col"
					outlined
					stack-label
					dense
					type="text"
					v-model="vehicle"
					label="vehicle"
				/>

				<q-input
					class="col"
					outlined
					stack-label
					dense
					type="text"
					v-model="empresa"
					label="empresa"
				/>



				<q-input
					class="col"
					outlined
					stack-label
					dense
					type="text"
					v-model="categoria"
					label="categoria"
				/>


				<div class="col">
					<q-btn label="Afegir" type="submit" color="primary" @submit.prevent="onSubmit"/>
					<!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
				</div>
			</div>

    </q-form>

  </div>
</template>


<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'



export default {
	setup: () => {
		const store = useStore()
		
		const nom = ref( 'aaa' )
		const matricula = ref( 'bbb' )
		const vehicle = ref( 'ccc' )
		const empresa = ref( 'ddd' )
		const categoria = ref( 'eee' )


		return {
			nom, matricula, vehicle, empresa, categoria,
			


			onSubmit: (e) => {
				console.log("Estic a onSubmit")

				const obj = {
					nom : nom.value,
					matricula : matricula.value,
					vehicle : vehicle.value,
					empresa : empresa.value,
					categoria : categoria.value
				}

				// console.log(obj)

				store.commit('mGarita/afegirRegistreP', obj)

				// posem a zero els camps del formulari
				nom.value = ''
				matricula.value = ''
				vehicle.value = ''
				empresa.value = ''
				categoria.value = ''

			},
			
			
			onReset: () => {
				return
			},


		}
		
		

	}
}
</script>

<style>

</style>