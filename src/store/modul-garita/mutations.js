
/* ENTRADES SORTIDES */


export function eliminarRegistreES ( state, id) {
	state.moviments = state.moviments.filter( registre => registre.id !== id )
}

export function afegirRegistreES ( state, obj) {
	obj.id = state.moviments.length
	state.moviments = [...state.moviments, obj]
}


export function actualitzarDataLlistatES ( state, data ) {
	state.dataLlistat = data
}


/* PERSONAL */


export function eliminarRegistreP ( state, id) {
	state.personal = state.personal.filter( registre => registre.id !== id )
}

export function afegirRegistreP ( state, obj) {
	obj.id = state.personal.length
	state.personal = [...state.personal, obj]
}



