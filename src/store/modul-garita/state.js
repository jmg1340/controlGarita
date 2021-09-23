import arrPersonal from "../../assets/personal.json"
import arrMov2021 from "../../assets/Moviments2021.json"
import prova from "../../assets/prova.json"
import moment from 'moment'

const arr = [...prova]

arr.map( (obj, index) => {
	// const [dia, mes, anyo] = obj.data.split("/")
	// console.log( obj.data, moment(`${obj.data} ${obj.hora === "" ? "00:00" : obj.hora}`))
	let dataAbans = obj.data
	obj.data = moment(`${obj.data}T${obj.hora === "" ? "00:00" : obj.hora}`);
	if (obj.data == "Invalid date") console.log( dataAbans )
	obj.id = index

	return obj
})

console.log(arr[1])

export default function () {
  return {
    personal: arrPersonal,
		moviments: arr
  }
}
