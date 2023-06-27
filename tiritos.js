//Esto hace falta para usar la consola de input
const readlineSync = require('readline-sync');

//Funcion para la eleccion de la accion de la compu
function jugadaAutomatica(){
    let eleccion;

    if(cargadoCompu){
        eleccion = (Math.floor(Math.random() * 2)+1);
    }
    else{
        eleccion = (Math.floor(Math.random() * 2));
    }
    return eleccion;
}
//Datos del coso
let opciones=["recargar", "cubrirse", "disparar"];

let vidaJugador=3;
let defensaJugador=false;
let cargadoJugador=true;

let vidaCompu=3;
let defensaCompu=false;
let cargadoCompu=true;

let seTermino=false;
//Arrancamos
console.log("BIENVENIDO A TIRITOS");
let nombre=readlineSync.question('Ingresa tu nombre: ');
console.log("--------------------------------------------------------------------------------");
console.log(`Este es un duelo a muerte ${nombre}, vos contra la compu`);
console.log(`Tu arma tiene una sola bala. Cada turno podes elegir recargar, disparar o cubrirte`);
console.log(`Que comience el duelo!!!`);

//El while corre mientras nadie este muerto
let turno=1;
while(!seTermino){   

    //se escoge la opcion.
    let accionJugador=readlineSync.keyInSelect(opciones, `${nombre}, que haces este turno?`);
    console.log(`-------------TURNO ${turno}---------------`);
    turno++;
    console.log(`${nombre} eligio ${opciones[accionJugador]}`);
    let accionCompu = jugadaAutomatica();
    console.log(`La compu eligio ${opciones[accionCompu]}`);

    //se colocan defensas si es necesario
    if (accionJugador==1){
        defensaJugador=true;
    }
    if (accionCompu==1){
        defensaCompu=true;
    }
    //se define el daño/estado del arma/vida de los contendientes en dos partes:
    //Parte del Jugador: 
    if (accionJugador == 0){
        if(cargadoJugador==true){
            console.log(`Presta atencion ${nombre}, ya tenes cargada el arma`);
        }
        else{
            cargadoJugador=true;
            console.log(`${nombre} recarga su arma`); 
        }
           
    }else if (accionJugador == 2){
       
        if(!cargadoJugador){
            console.log(`${nombre} intenta disparar sin balas...`);              
        }
        else if(!defensaCompu){
            vidaCompu--;
            console.log(`La compu trago plomo`);
        }
        else{
            console.log(`La compu se cubrio del disparo`); 
        }            
        cargadoJugador=false;         
    }
    //parte de la Compu
    if (accionCompu == 0){
        cargadoCompu=true;
        console.log(`La compu recarga su arma`); 
    }else if (accionCompu == 2){

        if(!cargadoCompu){              
        }
        else if(!defensaJugador){
            vidaJugador--;
            console.log(`${nombre} trago plomo`);
        }
        else{
            console.log(`${nombre} se cubrio del disparo`); 
        }      
        cargadoCompu=false;         
    }   

    //Se desactivan las defensas
    defensaCompu=false;
    defensaJugador=false;
    //Imprimo contidad de puntos de vida
    console.log(`-------------------------VIDAS------------------------------`);
    console.log(`             ${nombre}: ${vidaJugador}// compu: ${vidaCompu}`);    
    console.log(`------------------------------------------------------------`);
    
    //Busco por ganadores
    let ganador;
    if(vidaJugador == 0 && vidaCompu ==0){
        console.log(`La compu y ${nombre} caen muertos al suelo al mismo tiempo`);
        console.log(`Hay dignidad en un empate?`);
        seTermino=true;
    }
    else if(vidaJugador == 0 || vidaCompu ==0){
       
        if (vidaCompu == 0){
            ganador= nombre; 
        }
        else{
            ganador="la compu";
        }
        seTermino=true;
        //El ganador es el ganador. Naturalmente.
        console.log(`Un cuerpo cae al suelo`);
        console.log(`El ganador es ${ganador}`);
    
        if (ganador == nombre){
            console.log(`Felicitaciones ${nombre}`);
        }
        else{
            console.log(`Verguenza es que te gane un algoritmo de randomizar numeros, que la verdad tanto no randomiza...`)
        }
    }       
    
}
