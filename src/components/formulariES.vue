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
					v-model="data"
					label="Data"
					lazy-rules
					:rules="[
						val => val !== null && val !== '' || 'Escriu una data',
					]"
					@update:model-value="actualitzarDataLlistat(data)"
				>
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date 
							landscape
							today-btn
							color="orange-4"
							v-model="data"
							:locale="myLocale"
							mask="DD/MM/YYYY" 
							@update:model-value="actualitzarDataLlistat2(data, 'locale', {} )"
							v-close-popup="tancarPopup">

								<div class="row items-center justify-end">
									<q-btn v-close-popup label="Tancar" color="primary" flat />
								</div>

							</q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
				</q-input>

				<q-select
					class="col-3"
					dense
					v-model="nom"
					outlined
					stack-label
					use-input
					input-debounce="0"
					label="nom"
					:options="optionsCombo"
					options-dense
					menu-shrink
					@filter="filterFn"
					@update:model-value ="onCanviarQSelect(nom)"
				>
					<template v-slot:no-option>
						<q-item>
							<q-item-section class="text-grey">
								No results
							</q-item-section>
						</q-item>
					</template>
				</q-select>

<!-- 
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
 -->

				<q-input
					class="col-1"
					outlined
					stack-label
					dense
					type="text"
					v-model="matricula"
					label="matricula"
				/>

				<q-input
					class="col-1"
					outlined
					stack-label
					dense
					type="text"
					v-model="vehicle"
					label="vehicle"
				/>

				<q-input
					class="col-1"
					outlined
					stack-label
					dense
					type="text"
					v-model="empresa"
					label="empresa"
				/>


				<q-input
					class="col-1"
					outlined
					stack-label
					dense
					type="text"
					v-model="categoria"
					label="categoria"
				/>

				<q-input
					class="col-1"
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
					class="col-1"
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

				<div class="col-1">
					<q-btn label="Afegir" type="submit" color="primary" @submit.prevent="onSubmit"/>
					<!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
				</div>
			</div>

    </q-form>

  </div>
</template>


<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'



export default {
	setup: () => {
		const store = useStore()
		
		const data = ref( moment().format( 'DD/MM/YYYY') )
		const nom = ref( '' )
		var matricula = ref( 'bbb' )
		const vehicle = ref( 'ccc' )
		const empresa = ref( 'ddd' )
		const hora = ref( moment().format( "HH:mm") )
		const ES = ref( 'S' )
		const categoria = ref( 'eee' )


		const getOptions = () => {
			let arr = computed(() => [...store.state.mGarita.personal] )
			console.log("arr", arr)
			return arr.value.map( obj => { return { "label": obj.nom, "value": obj.id }		})
		}
		let options = getOptions()
		let optionsCombo = ref( options )


		const omplirAltresCamps = valor => {
				console.log("estic a omplirAltresCamps")
				console.log("valor", valor.value)

				const objTrobat = store.state.mGarita.personal.find( (obj) => obj.id == valor.value )
				if (objTrobat){
					matricula.value = objTrobat.matricula
					vehicle.value = objTrobat.vehicle
					empresa.value = objTrobat.empresa
					categoria.value = objTrobat.categoria
				}

			}		

		let tancarPopup = ref( false )






		return {
			data, nom, matricula, vehicle, empresa, hora, ES, categoria,
			tancarPopup,
			optionsCombo,

			myLocale: {
        /* starting with Sunday */
        days: 'Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres'.split('_'),
        daysShort: 'Dg_Dll_Dm_Dcr_Dj_Dv_Ds'.split('_'),
        months: 'Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre'.split('_'),
        monthsShort: 'Gen_Feb_Mar_Abr_Mai_Jun_Jul_Ago_Set_Oct_Nov_Des'.split('_'),
        firstDayOfWeek: 1
      },

			
			onCanviarQSelect: (valor) => { omplirAltresCamps(valor) },


      filterFn (val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          optionsCombo.value = options.filter(obj => obj.label.toLowerCase().indexOf(needle) > -1)
        })
      },


			
			onSubmit: (e) => {
				console.log("Estic a onSubmit")
				console.log( data.value)

		

				
				const anyo = new Date(data.value).getFullYear()
				const mes = new Date(data.value).getMonth() + 1
				const dia = new Date(data.value).getDate()
				// const [min, seg] = hora.value.split(":")

				console.log(`Dia-hora: ${dia}/${mes}/${anyo} ${hora === "" ? "00:00" : hora}`)


				const obj = {
					data : moment(`${data.value} ${hora === "" ? "00:00" : hora}`, "DD.MM.YYYY HH.mm"),
					// data : moment(`${dia}/${mes}/${anyo} ${hora === "" ? "00:00" : hora}`, "DD.MM.YYYY HH.mm"),
					nom : nom.value.label,
					matricula : matricula.value,
					vehicle : vehicle.value,
					empresa : empresa.value,
					hora : hora.value,
					ES : ES.value,
					categoria : categoria.value
				}

				store.commit('mGarita/afegirRegistreES', obj)

				// posem a zero els camps del formulari

				nom.value = null
				matricula.value = ''
				vehicle.value = ''
				empresa.value = ''
				hora.value =  moment().format("HH:mm")
				ES.value = ''
				categoria.value = ''

			},
			
			
			onReset: () => {
				return
			},

			actualitzarDataLlistat: (data) => { 
				console.log("Estic a actualitzarDataLlistat")
				console.log("novaData", data)
				store.commit('mGarita/actualitzarDataLlistatES', data)
				},

			actualitzarDataLlistat2: (novaData, reason, details) => { 
				console.log("Estic a actualitzarDataLlistat2")
				console.log("novaData", novaData)
				store.commit('mGarita/actualitzarDataLlistatES', novaData)
				tancarPopup = true
				}

		}
		
		

	}
}
</script>

<style>

</style>