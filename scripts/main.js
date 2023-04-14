function renderJuegos (jueguitos){
    let agregar = document.querySelector('#lista-juegos')
    let html=""

    jueguitos.forEach(jueguito=>{
        html += `
            <div id=${jueguito.id} class="tarjeta-juego">
            <h3 class="titulo-juego">${jueguito.name}</h3>
            <img src="images/${jueguito.img}" alt="" class="imagen-juego">
            </div>
            `
    });
    agregar.innerHTML = html
}


document.addEventListener('DOMContentLoaded', ()=>{
    fetch('data/maquinas.json')
    .then((data)=>{
        return data.json()
    })
    .then ((jueguitos)=>{
        renderJuegos(jueguitos) 
    })
    .catch((err)=>{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
          })
    })
})

const MAX_GANADO = 10000;
const MAX_PERDIDO = -1000;

let juegos = [];
let seleccionJuego = document.querySelector("#lista-juegos")
let jugar = document.querySelector("#btn")
let resultadosJuego = document.querySelector("#tabla-resultados-juegos")
let resultadosApuesta = document.querySelector("#tabla-resultados-apuestas")


async function juegoSeleccionado(evt){
    let maquinaSeleccionada = await evt.target.parentElement
    function datosMaquinaSeleccionada (maquinaSeleccionada) {
        let infoMaquina = maquinaSeleccionada.querySelector('h3').textContent 
    return infoMaquina
    };

    let nombreMaquina = datosMaquinaSeleccionada(maquinaSeleccionada)

    localStorage.setItem('Maquina', nombreMaquina)
    
    juegos.push(juegoSeleccionado)
    
    function totalJuego(){
        juegos.forEach( infoMaquina => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td class="linea-tabla">${localStorage.getItem('Maquina')}</td>
            `;
            resultadosJuego.appendChild(row);
        })  
    }
    totalJuego() 
};



seleccionJuego.addEventListener('click', juegoSeleccionado)


async function apostar () {
    let apostado = await document.querySelector ("#apostado").value
    let apuesta = parseInt(apostado)
    let ganancia = await Math.ceil((Math.random()*(MAX_PERDIDO - MAX_GANADO)+ MAX_GANADO)+apuesta);
    let totalApuesta = (ganancia + apuesta);

    if(totalApuesta>apuesta){
        Swal.fire({
            icon: 'success',
            title: '¡Has ganado!',
          })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Has perdido :(',
          })
    }

    localStorage.setItem('Ganado', ganancia)

    juegos.push(apostar)

    function totalGanado(){
                juegos.forEach( totalApuesta => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td class="linea-tabla">$${localStorage.getItem('Ganado')}</td>
                    `;
                resultadosApuesta.appendChild(row);
                })
            }
            
    totalGanado()

}

jugar.addEventListener ('click' , apostar)







// const MAX_GANADO = 10000;
// const MAX_PERDIDO = -1000;

// let juegos = [];
// let seleccionJuego = document.querySelector("#lista-juegos")
// let resultados = document.querySelector("#tabla-resultados")

// seleccionJuego.addEventListener('click', apuesta)


// function apuesta(evt){
//     let maquinaSeleccionada = evt.target.parentElement
//     let dineroInicial = Number(prompt("Ingresar cantidad de dinero a apostar $"));
//     let ganancia = Math.ceil((Math.random()*(MAX_PERDIDO - MAX_GANADO)+ MAX_GANADO)+dineroInicial);
//     let totalApuesta = "$" + (ganancia + dineroInicial);
//     console.log (totalApuesta);
//     function datosMaquinaSeleccionada (maquinaSeleccionada) {
//         let infoMaquina = maquinaSeleccionada.querySelector('h4').textContent
//         console.log (infoMaquina)
//         return infoMaquina
//     };
    
//     let nombreMaquina = datosMaquinaSeleccionada(maquinaSeleccionada)

//     juegos.push(apuesta)

//     sessionStorage.setItem('Maquina', nombreMaquina)
//     sessionStorage.setItem('Ganado', totalApuesta)

//     function total(){
//         juegos.forEach( maquinaSeleccionada => {
//             let row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${sessionStorage.getItem('Maquina')}</td>
//                 <td>${sessionStorage.getItem('Ganado')}</td>
//             `;
//             resultados.appendChild(row);
//         })
//     }
    
//     total()  
    
    
// };







