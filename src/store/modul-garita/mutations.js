export function eliminarRegistre ( state, id) {
	state.moviments = state.moviments.filter( registre => registre.id !== id )
}

export function afegirRegistre ( state, obj) {
	obj.id = state.moviments.length
	state.moviments = [...state.moviments, obj]
}
