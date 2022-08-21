const fecha = document.getElementById('fecha')
const lista = document.getElementById('lista')
const input = document.getElementById('input')
const btnEnter = document.getElementById('enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const tachado = 'tachado'
let id
let listado


//app clima -- defino variables
const btnBusqueda = document.getElementById('botonBusqueda')
const inputCiudad = document.getElementById('ciudad')
const city = document.getElementById('nombreCiudad')
const descrip = document.getElementById('descripcion')
const grados = document.getElementById('temperatura')
const API_KEY = 'b4700b9bc0472257da2d7ba4f3d23d96'





//creación de fecha
const dia = new Date()
fecha.innerHTML = dia.toLocaleDateString('es-AR', {weekday:'long',year:'numeric', month:'long', day:'numeric'})


//Creo la función para insertar nuevas tareas a mi lista
function insertarTarea(tarea, id, realizado, eliminado) {

    if(eliminado){
        return
    }

    const tareaRealizada = realizado ? check : uncheck
    const rayar = realizado ? tachado : ''

    const bloqueTarea =
    `<li>
     <i class="far ${tareaRealizada}" data="realizado" id="${id}"></i>
     <p class="text ${rayar}">${tarea}</p>
     <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
     </li>    
    `
    lista.insertAdjacentHTML('beforeend',bloqueTarea)
}

//Defino la función para el caso de que la tarea esté completa/realizada
function tareaCompleta(iconos){
    iconos.classList.toggle(check)
    iconos.classList.toggle(uncheck)
    iconos.parentNode.querySelector('.text').classList.toggle(tachado)
    listado[iconos.id].realizado = listado[iconos.id].realizado ? false : true
}


//Defino la función para eliminar tareas de la lista
function tareaEliminada(iconos){
    iconos.parentNode.parentNode.removeChild(iconos.parentNode)
    listado[iconos.id].eliminado = true
}

//Genero la posibilidad de insertar tareas presionando la tecla Enter
document.addEventListener('keyup',function(e){
    if(e.key == 'Enter'){
        const tarea = input.value
        if(tarea) {
            insertarTarea(tarea, id, false, false)
            listado.push({
                nombre:tarea,
                id:id,
                realizado: false,
                eliminado: false
            })
        }
        localStorage.setItem('almacenadas',JSON.stringify(listado))
        input.value = ''
        id++
    }
})

//Le doy la funcionalidad al icono de insertar tareas a la lista cuando recibe un click
btnEnter.addEventListener('click',()=> {
    const tarea = input.value
    if(tarea) {
        insertarTarea(tarea, id, false, false)
        listado.push({
            nombre:tarea,
            id:id,
            realizado: false,
            eliminado: false
        })
    }
    localStorage.setItem('almacenadas',JSON.stringify(listado))
    input.value = ''
    id++
})

lista.addEventListener('click', function(e){
    const iconos = e.target
    const iconosData = iconos.attributes.data.value
    if(iconosData === 'realizado'){
        tareaCompleta(iconos)
    } else if (iconosData === 'eliminado'){
        tareaEliminada(iconos)
    }
    localStorage.setItem('almacenadas',JSON.stringify(listado))
})

//local starage get item

let registradas = localStorage.getItem('almacenadas')
if(registradas){
    listado = JSON.parse(registradas)
    id = listado.length
    recuperarlista(listado)
} else {
    listado = []
    id = 0
}

function recuperarlista(tareasguardadas){
    tareasguardadas.forEach(function(i){
     insertarTarea(i.nombre, i.id, i.realizado, i.eliminado)
    });
}





btnBusqueda.addEventListener('click', function(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+inputCiudad.value+`&appid=${API_KEY}&units=metric&lang=es`)
    .then(response => response.json())
    .then(datos => {
        let cityName = datos['name']
        let temp = datos['main']['temp']
        let desc = datos['weather'][0]['description']


        city.innerHTML = cityName
        descrip.innerHTML =desc.toUpperCase()
        grados.innerHTML = `${temp}°C`
        inputCiudad.value = ""
    })

})

document.addEventListener('keyup', function(e){
    if(e.key == 'Enter'){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+inputCiudad.value+`&appid=${API_KEY}&units=metric&lang=es`)
    .then(response => response.json())
    .then(datos => {
        let cityName = datos['name']
        let temp = datos['main']['temp']
        let desc = datos['weather'][0]['description']


        city.innerHTML = cityName
        descrip.innerHTML =desc.toUpperCase()
        grados.innerHTML = `${temp}°C`
        inputCiudad.value = ""
    })
    }
})