// Parseamos obj_pedido y AyudaGuardar del localStorage para recuperar las propiedades del objeto pedido de la sesion anterior

let obj_pedido;
let recuperar_pedido;
let pedidoRecuperado;


// Comprobar si obj_pedido existe
if (localStorage.getItem("obj_pedido")){
    pedidoRecuperado = JSON.parse(localStorage.getItem("obj_pedido"));

    Swal.fire({
        title: 'Quieres recuperar el último pedido?',
        showDenyButton: true,
        confirmButtonText: 'Recuperar',
        denyButtonText: `Nuevo pedido`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            document.getElementById("Inp_invitados").value = pedidoRecuperado.NumPersonas;

            //recupero RELLENO
            let rell_recup = pedidoRecuperado.Rell_ArrayObj.find(element => element.id == pedidoRecuperado.relleno).id
            document.getElementById(rell_recup).checked = true
            //recupero BIZCOCHO
            let biz_recup = pedidoRecuperado.Biz_ArrayObj.find(element => element.id == pedidoRecuperado.bizcocho).id
            document.getElementById(biz_recup).checked = true
            //recupero COBERTURA
            let cov_recup = pedidoRecuperado.Cov_ArrayObj.find(element => element.id == pedidoRecuperado.cover).id
            document.getElementById(cov_recup).checked = true
            //recupero DECORACION
            let deco_recup = pedidoRecuperado.Dec_ArrayObj.find(element => element.id == pedidoRecuperado.deco).id
            document.getElementById(deco_recup).checked = true
            //recupero SIZE
            pedidoRecuperado.tam == "pequenio" ? (tamanioChica.checked = true, tamanioMediana.checked = false, tamanioGrande.checked = false) : (pedidoRecuperado.tam == "mediano"
                                                  ? (tamanioMediana.checked = true, tamanioChica.checked = false, tamanioGrande.checked = false) : 
                                                    (tamanioGrande.checked = true, tamanioChica.checked = false, tamanioMediana.checked = false));

            
            //recupero PICKUP-DELIVERY 
            pedidoRecuperado.PickDel == "pickup" ? (document.getElementById("butt_del").checked = false, document.getElementById("butt_pick").checked = true):
                                                   (document.getElementById("butt_del").checked = true,  document.getElementById("butt_pick").checked = false);
        
            document.getElementById("DKK_total").innerText = "Precio:  "+pedidoRecuperado.precioFinal + " DKK";
            document.getElementById("EUR_total").innerText = "("+pedidoRecuperado.precioFinal_EUR + " EUR)";

        // Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            localStorage.clear(obj_pedido)
        // Swal.fire('Changes are not saved', '', 'info')
        }
    })
    
}

// Definimos CLASES
class Torta {
    constructor(relleno, bizcocho, NumPersonas, cover, deco, PickDel, precioFinal_EUR, precioDelivery){
        this.relleno = relleno;
        this.bizcocho = bizcocho;
        this.cover = cover;
        this.deco = deco;
        this.PickDel = PickDel;
        this.NumPersonas = NumPersonas;
        this.precioBase = 200;
        this.precioFinal_EUR = precioFinal_EUR;
        this.precioDelivery = 0
        


        // Definimos ARRAYS
        this.Rell_ArrayObj = [ {id:'WCB', nombre: 'White Chocolate Buttercream', precio: 100},
                          {id:'DCB', nombre: 'Dark Chocolate Buttercream', precio: 200},
                          {id:'BB',  nombre: 'Berries Buttercream', precio: 300},
                          {id:'VB',  nombre: 'Vanilla Buttercream', precio: 400},
                          {id:'LB',  nombre: 'Lemon Buttercream', precio: 500}
                         ]
         
        this.Biz_ArrayObj = [  {id:'VS', nombre: 'Vanilla sponge', precio: 100},
                          {id:'CS', nombre: 'Dark Chocolate sponge', precio: 200},
                          {id:'BV', nombre: 'Berries-Vanilla sponge', precio: 300},
                          {id:'LV', nombre: 'Lemon-Vanilla sponge', precio: 400},
                          {id:'RV', nombre: 'Red Velvet sponge', precio: 500}
                        ]
         
        this.Cov_ArrayObj = [ {id:'NB', nombre: 'Naked Buttercream', precio: 100},
                         {id:'B',  nombre: 'Dark/White chocolate buttercream', precio: 200},
                         {id:'N',  nombre: 'Naked', precio: 300},
                         {id:'F', nombre: 'Fondant', precio: 400},
                         {id:'G', nombre: 'Ganache', precio: 500}
                        ]
         
        this.Dec_ArrayObj = [ {id:'R',  nombre: 'Rainbows', precio: 100},
                        {id:'F', nombre: 'Flowers', precio: 200},
                         {id:'L',  nombre: 'Letter cake', precio: 300},
                         {id:'M', nombre: 'Minimalistic', precio: 400},
                         {id:'T', nombre: 'Thematic', precio: 500}
                        ]


         this.tam_ArrayObj = [ { tam: "pequenio", precio: 0},
                        { tam: "mediano",  precio: 500},
                        { tam: "grande",   precio: 1000},
                        { tam: "gigante",   precio: 2000}];
    }
    
    // Definimos METODOS
    // metodo para calcular el tamanio
    calcTamanio(personas){
        this.NumPersonas = personas;
        if (personas <= 5) {
            this.tam = "pequenio";
            } 
        else if (personas > 5 && personas <= 15) {
            this.tam = "mediano";
            } 
        else if (personas > 15 && personas <= 25) {
            this.tam = "grande";
            } 
        else {
            this.tam = "gigante";
            } 
        }

    // metodo para calcular PRECIO FINAL 
    CalcPrecioFinal(){
        let precioRelleno  = this.Rell_ArrayObj.find(element => element.id ===  this.relleno).precio;
        let precioBizcocho = this.Biz_ArrayObj.find(element => element.id ===  this.bizcocho).precio;
        let precioCover = this.Cov_ArrayObj.find(element => element.id ===  this.cover).precio;
        let precioDeco = this.Dec_ArrayObj.find(element => element.id ===  this.deco).precio;
        let precioTamanio  = this.tam_ArrayObj.find(element => element.tam ===  this.tam).precio;

        this.precioFinal   = this.precioBase + precioRelleno 
                                             + precioBizcocho
                                             + precioCover
                                             + precioDeco
                                             + precioTamanio
                                             + this.precioDelivery;
    }

    // metodo para resumir el pedido
    pedidoResumen() {
        let ped_tam = this.tam
        let ped_biz = this.Biz_ArrayObj.find(element => element.id ===  this.bizcocho).nombre;
        let ped_rell = this.Rell_ArrayObj.find(element => element.id ===  this.relleno).nombre;
        let ped_cov = this.Cov_ArrayObj.find(element => element.id ===  this.cover).nombre;
        let ped_deco = this.Dec_ArrayObj.find(element => element.id ===  this.deco).nombre;
        
        Swal.fire({
            title: 'Está seguro que desea enviar el pedido?',
            text: "Resumen del pedido pedido:\n\ttamano: "+ ped_tam
                                        + "\n\tbizcocho: "+ ped_biz
                                        + "\n\trelleno: " + ped_rell
                                        + "\n\tcover " + ped_cov
                                        + "\n\tdecoración: " + ped_deco
                                        + "\n\nPrecio final: "+ this.precioFinal +"Krs.",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Enviar!',
            denyButtonText: `Aun no`,
            }).then((result) => {
            
            if (result.isConfirmed) {
            Swal.fire('Gracias por realizar su pedido!', '', 'success')
            } else if (result.isDenied) {
            // Swal.fire('Pedido no Guardado', '', 'info')
            }
            })
    }

}



////////////////////////////////////////////////////////////////////////
// Activamos el boton que toca por tamaño
let tamanioChica = document.getElementById("but_10x15");
let tamanioMediana = document.getElementById("but_15x15");
let tamanioGrande = document.getElementById("but_20x15");

var precio_tamano

tamanioChica.addEventListener('click',  () => {
    
    precio_tamano = 500
    alert(precio_tamano)
});

////////////////////////////////////////////////////////////////////////

// leer tamaño - solo para boton ahora
let butt_calc = document.getElementById("calc");
let DKK_calc_total= document.getElementById("DKK_total")
let EUR_calc_total= document.getElementById("EUR_total")

// Creamos objeto vacio de la clase Torta
const pedido = new Torta()

window.addEventListener("change", () => {

    // Leer numero de invitados desde el box input
    let invitados = parseInt(document.getElementById("Inp_invitados").value)

    // Calculamos el TAMAÑO con el numero de invitados
    pedido.calcTamanio(invitados);

    // let butt_tam  = document.querySelector('input[name="Size"]:checked')
    let card_rell = document.querySelector('input[name="relleno"]:checked')
    let card_biz  = document.querySelector('input[name="Sponge"]:checked')
    let card_cov  = document.querySelector('input[name="cover"]:checked')
    let card_deco = document.querySelector('input[name="deco"]:checked')
    let but_del   = document.querySelector('input[name="delivery"]:checked')
    
    pedido.relleno = card_rell.value
    pedido.bizcocho = card_biz.value
    pedido.cover = card_cov.value
    pedido.deco = card_deco.value
    pedido.PickDel = but_del.value
    if (pedido.PickDel=="delivery") {pedido.precioDelivery=150}
    if (pedido.PickDel=="pickup") {pedido.precioDelivery=0}
    
    // checks antes de calcular precio final
    // Nos aseguramos que invitados es un numero
    if (isNaN(invitados) ) {
        Swal.fire({
            title: 'El numero de invitados tiene que ser un numero!',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        
    }
    else if (invitados>25) {
        Swal.fire({
            title: 'Para más de 25 invitados, por favor envíanos un e-mail',
            text: 'milocakery@gmail.com',
            icon: 'info',
            confirmButtonText: 'Cool'
          })
    }
    else {
        // 4) Calcular precio final 
        pedido.CalcPrecioFinal();
        DKK_calc_total.innerText = "Precio:  " + pedido.precioFinal + "DKK";


        fetch('https://api.exchangerate-api.com/v4/latest/DKK')
        .then((response) => response.json())
        .then(data => {
            let exchangeRate = data.rates.EUR
            let precioEUR = pedido.precioFinal * exchangeRate
            EUR_calc_total.innerText = "(" + precioEUR.toFixed(1) + " EUR)";
            pedido.precioFinal_EUR = precioEUR;
            localStorage.setItem("obj_pedido", JSON.stringify(pedido))
            });
    
    }

});

calc.addEventListener("click", () => {
    // Confirmar pedido
    pedido.pedidoResumen();
})

////////////////////////////////////////////////////////////////////////