var arr = [10, 12, 15, 21];

function timer () {
    for (let i = 0; i < arr.length; i++) {
        setTimeout(function() {
            console.log('The index of this number is: ' + i);
        }, 3000);
    }
}


timer();

/*
let timer = new Promise((resolve, reject) => {
    // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
    // En este ejemplo, usamos setTimeout(...) para simular código asíncrono.
    // En la vida real, probablemente uses algo como XHR o una API HTML5.
    setTimeout(function(){
      resolve("¡Éxito!"); // ¡Todo salió bien!
    }, 250);
  });

  miPrimeraPromise.then((successMessage) => {
    // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
    // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
    console.log("¡Sí! " + successMessage);
  });
  */


  class Contador{
    #contador
    constructor(){
      this.counter = 0;
    }
    
    incrementar(){
        this.counter = this.counter + 1;
    }
    
    decrementar(){
        this.counter = this.counter - 1;
    }
    
    getContador(){
        return this.counter;
    }
  }
  
  let contador1 = new Contador();
  let contador2 = new Contador();
  contador1.incrementar();
  contador1.incrementar();
  contador2.incrementar();
  console.log(contador1.getContador());
  console.log(contador2.getContador());

  console.log(contador1.contador);



/**************************************PRUEBA */

//EL LINK ES:  https://codeshare.io/arZwKZ
// LA SEGUNDA PRUEBA ES: https://codesandbox.io/s/icy-cache-3cy1z?file=/src/Search.js:634-648


// Nombra dos paradigmas de programación importantes en JS
//Funcional y orientado a objetos


// ¿Qué imprimira el siguiente codigo?
var arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log('The index of this number is: ' + i);
  }, 3000);
}

/*The index of this number is: 4
The index of this number is: 4
The index of this number is: 4
The index of this number is: 4*/

// Corregir el codigo anterior y mostrar los indices en el orden 0,1,2,3. No se pude alterar el setTimeout dentro del for

for (let i = 0; i < arr.length; i++){
  setTimeout(function(){
  	console.log('The index of this number is: '+i);
  }, 3000);
}
/*
The index of this number is: 0
The index of this number is: 1
The index of this number is: 2
The index of this number is: 3
*/


// Construye una estructura que tenga un contador, permita incrementar y decrementarlo y obtener su valor
// Esta estructura debe de permitir:
//  Replicarse en multiples variables manteniendo cada una su propio contador.
//  incrementar en una unidad +1
//  decrementar en una unidad -1
//  El contador no debe de estar accesible de tal forma que operaciones como: obj.contador = 10; no sean posibles de hacer. es decir una propiedad sea "privada".

class Contador{
  #contador
  constructor(){
    this.counter = 0;
  }
  
  incrementar(){
  	this.counter = this.counter + 1;
  }
  
  decrementar(){
  	this.counter = this.counter - 1;
  }
  
  getContador(){
  	return this.counter;
  }
}

let contador1 = new Contador();
let contador2 = new Contador();
contador1.incrementar();
contador1.incrementar();
contador2.incrementar();
console.log(contador1.getContador()); // 2
console.log(contador2.getContador()); // 1
console.log(contador1.counter); // undefined



// Hacer una implementación básica de un debounce de eventos.
// Este codigo es un codigo ejemplo para llamar la funcion
/*
    let elem = document.getElementById('container');
    elem.addEventListener('click', delayFn(
      function foo() {
        console.log('You click');
      }, 2000
    ));
*/


function delayFN(callback, wait){
 let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { callback(...args); }, wait);
  };
}
    

// Menciona tú lenguaje favorito y menciona que elementos hacen que sea tú lenguaje favorito.
//javascript ya que he trabajado con otros lenguajes y me agrada la forma en qué implementa la asincronía, en comparación de bash por
//ejemplo que ejecuta las instrucciones de forma secuencial, y de igual forma es menos robusto que Java por ejemplo, creo que el lenguaje que le
//podría ganar sería python por la forma abstracta y facil de manejar el propio lenguaje, pero sería cuestión de que lo trabaje más para obtener una 
//mejor conclusión
