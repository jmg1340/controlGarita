import arrPersonal from "../../assets/personal.json"
import arrMov2021 from "../../assets/Moviments2021.json"
import prova from "../../assets/prova.json"
import moment from 'moment'

const arrES = [...prova]

arrES.map( (obj, index) => {
	// const [dia, mes, anyo] = obj.data.split("/")
	// console.log( obj.data, moment(`${obj.data} ${obj.hora === "" ? "00:00" : obj.hora}`))
	let dataAbans = obj.data
	obj.data = moment(`${obj.data} ${obj.hora === "" ? "00:00" : obj.hora}`, "DD.MM.YYYY HH.mm");
	// if (obj.data == "Invalid date") console.log( "Data invalida", "data abans de moment:", dataAbans )
	obj.id = index

	return obj
})

const arrP = [...arrPersonal]

arrP.map( (obj, index) => {
	obj.id = index
	return obj
})



export default function () {
  return {
    personal: arrP,
		moviments: arrES,
		dataLlistat: moment().format( 'DD/MM/YYYY')
  }
}
