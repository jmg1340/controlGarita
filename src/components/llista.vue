<template>

  <div class="q-pa-md">
    <q-table
      separator="cell"
      dense
      :rows="llista"
      :columns="columnes"
      row-key="data"
			class="my-sticky-header-table"
			:rows-per-page-options="[50]"
    >

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
							<q-btn icon="cancel" dense class="text-red" flat @click="eliminar(col.value)" />
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
import { computed } from 'vue'
import moment from 'moment'



const columnes = [
	{ name: 'data', label: 'data', field: 'data', align: 'center', sortable: false , headerClasses: 'bg-brown-10 text-yellow-1' },
	{ name: 'nom', label: 'nom', field: 'nom', align: 'left', headerClasses: 'bg-brown-10 text-white' },
	{ name: 'matricula', label: 'matricula', field: 'matricula', align: 'left', headerClasses: 'bg-brown-10 text-white' },
	{ name: 'vehicle', label: 'vehicle', field: 'vehicle', align: 'left', headerClasses: 'bg-brown-10 text-white' },
	{ name: 'empresa', label: 'empresa', field: 'empresa', align: 'left', headerClasses: 'bg-brown-10 text-white' },
	{ name: 'hora', label: 'hora', field: 'hora', align: 'center', headerClasses: 'bg-brown-10 text-white' },
	{ name: 'ES', label: 'E/S', field: 'ES', align: 'center', headerClasses: 'bg-brown-10 text-white', format: (val, row) => val.toUpperCase()},
	{ name: 'categoria', label: 'categoria', field: 'categoria', align: 'left', headerClasses: 'bg-brown-10 text-white' },
	{ name: 'index', label: 'id', field: 'id' , align: 'center', headerClasses: 'bg-brown-10 text-white' },
]



const customSort = (rows, sortBy, descending) => {
	console.log("estic a customSort")
	const arr = [...rows]
	console.log(rows[0].data)


	if (sortBy) {
		arr.sort((a, b) => {
			const x = descending ? b : a
			const y = descending ? a : b

			if (sortBy === 'data') {
				// numeric sort
				return parseFloat(x[ sortBy ]) - parseFloat(y[ sortBy ])
			}	else {
				// string sort
				return x[ sortBy ] > y[ sortBy ] ? 1 : x[ sortBy ] < y[ sortBy ] ? -1 : 0
			}
		})
	}

	console.log("-------------")
	console.log( moment().format("DD/MMM/YYYY") )
	console.log( rows[0].data )
	console.log( rows[0].data.format("DD/MM/YYYY") )
	console.log("-------------")
	return arr
}




export default {
	setup: () => {
		const store = useStore()

		return {
			columnes,
			llista: computed(() =>  customSort( store.state.mGarita.moviments, "data", true )),
			
			eliminar: id => {
				console.log(store)
				store.commit('mGarita/eliminarRegistre', id)
			}
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
    background-color: #c4c4c4

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
