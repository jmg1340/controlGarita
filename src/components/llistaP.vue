<template>

  <div class="q-pa-md">
    <q-table
      separator="cell"
      dense
      :rows="llista"
      :columns="columnes"
      row-key="data"
			no-data-label="No he trobat res..."
			:filter="filter"
			class="my-sticky-header-table"
			:rows-per-page-options="[50]"
    >

      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" color="secondary" placeholder="Escriu algo per buscar...">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>




      <template v-slot:body="props">
        <q-tr :props="props">
          
					<q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >

						<div 
						v-if="col.name !== 'index'"
						:props="props"
						>
            	{{ col.value }}
						</div>


						<div v-else>
							<q-btn size="xs" icon="cancel" dense class="text-red" flat @click="eliminar(col.value)" />
						</div>

          </q-td>

					<!-- <q-td
						key="id"
						:props="props"
					>
						<q-btn icon="fa fa-cancel" @click="eliminar(col.value)" :label="col.value"/>
					</q-td> -->
        </q-tr>
      </template>





		</q-table>
  </div></template>

<script>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import moment from 'moment'



const columnes = [
	{ name: 'nom', label: 'nom', field: 'nom', align: 'left', headerClasses: 'bg-brown-10 text-white' },
	{ name: 'matricula', label: 'matricula', field: 'matricula', align: 'left', headerClasses: 'bg-brown-10 text-white' },
	{ name: 'vehicle', label: 'vehicle', field: 'vehicle', align: 'left', headerClasses: 'bg-brown-10 text-white' },
	{ name: 'empresa', label: 'empresa', field: 'empresa', align: 'left', headerClasses: 'bg-brown-10 text-white' },
	{ name: 'categoria', label: 'categoria', field: 'categoria', align: 'left', headerClasses: 'bg-brown-10 text-white' },
	{ name: 'index', label: 'id', field: 'id' , align: 'center', headerClasses: 'bg-brown-10 text-white' },
]









export default {
	setup: () => {
		const store = useStore()

		return {
			columnes,
			llista: computed(() => {  
				return store.state.mGarita.personal
			}),

			filter: ref(''),
			
			eliminar: id => { store.commit('mGarita/eliminarRegistreP', id)	}
		}
		
	}


}
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 395px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #f2f2f2

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
