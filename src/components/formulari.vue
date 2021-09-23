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
					type="date"
					v-model="data"
					label="Data"
					lazy-rules
					:rules="[
						val => val !== null && val !== '' || 'Escriu una data',
					]"
				/>

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
					v-model="hora"
					label="hora"
					lazy-rules
					:rules="[
						val => val !== null && val !== '' || 'Escriu una hora'
					]"
				/>

				<q-input
					class="col"
					outlined
					stack-label
					dense
					type="text"
					v-model="ES"
					label="ES"
					lazy-rules
					:rules="[
						val => val !== null && val !== '' || 'Escriu E o S'
					]"
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
					<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
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
		
		const data = ref( new Date() )
		const nom = ref( 'aaa' )
		const matricula = ref( 'bbb' )
		const vehicle = ref( 'ccc' )
		const empresa = ref( 'ddd' )
		const hora = ref( '18:18' )
		const ES = ref( 'S' )
		const categoria = ref( 'eee' )



		return {
			data, nom, matricula, vehicle, empresa, hora, ES, categoria,

			
			onSubmit: (e) => {
				console.log( data.value)

				const anyo = data.value.getFullYear()
				const mes = data.value.getMonth() + 1
				const dia = data.value.getDate()
				const [min, seg] = hora.value.split(":")

				const obj = {
					data : moment ({ year: anyo, month: mes, day: dia, hour: hora, minute: min, second: 0, millisecond: 0 }),
					nom : nom.value,
					matricula : matricula.value,
					vehicle : vehicle.value,
					empresa : empresa.value,
					hora : hora.value,
					ES : ES.value,
					categoria : categoria.value
				}

				console.log(obj)

				store.commit('mGarita/afegirRegistre', obj)

			},
			
			
			onReset: () => {
				return
			}

		}
		
		

	}
}
</script>

<style>

</style>