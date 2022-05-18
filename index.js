const baseDeDatos = [
    {
        id: 1,
        nombre: 'Buzo Eva 01',
        precio: 5650,
        imagen: 'images/Buzo_Eva01.jpg'
    },
    {
        id: 2,
        nombre: 'Camisa 0 1 0',
        precio: 2000,
        imagen: 'images/Camisa_010.jpg'
    },
    {
        id: 3,
        nombre: 'Camisa Ryuk',
        precio: 4600,
        imagen: 'images/Camisa_Ryuk.jpg'
    },
    {
        id: 4,
        nombre: 'Joggin Camel Tyler',
        precio: 2700,
        imagen: 'images/Jogging_CamelTyler.jpg'
    },
    {
        id: 5,
        nombre: 'Piloto Transporting',
        precio: 4100,
        imagen: 'images/Piloto_Trainspoting.jpg'
    },
    {
        id: 6,
        nombre: 'Sweater Tyler',
        precio: 3500,
        imagen: 'images/Sweater_Tyler.jpg'
    }

];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonComprar = document.querySelector('#boton-comprar');

const guardarStorage = (key, value) => { localStorage.setItem(key, value)};
for (nombre of baseDeDatos) {
    guardarStorage(nombre.id , JSON.stringify(nombre));
}



function renderizarProductos() {
    baseDeDatos.forEach((info) => {

        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');

        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('contenedor-hijo');

        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;

        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('hijo__imagen');
        miNodoImagen.setAttribute('src', info.imagen);

        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('hijo__info');
        miNodoPrecio.textContent = `${divisa}${info.precio} ARS.`;

        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+ Agregar';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', añadirProductoAlCarrito);

        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

function añadirProductoAlCarrito(evento) {

    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();
}

function renderizarCarrito() {

    DOMcarrito.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
        
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            
            return itemBaseDatos.id === parseInt(item);
        });
        
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            
            return itemId === item ? total += 1 : total;
        }, 0);
        
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio} ARS`;
        
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    
    DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {
    
    const id = evento.target.dataset.item;
    
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    
    renderizarCarrito();
}


function calcularTotal() {
    
    return carrito.reduce((total, item) => {
        
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
       
        return total + miItem[0].precio;
    }, 0) + ' ARS';
} 

function vaciarCarrito() {
    
    carrito = [];
    
    renderizarCarrito();
}
function comprarCarrito() {
    alert('Compra realizada con exito!');
}


DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonComprar.addEventListener('click', comprarCarrito);

renderizarProductos();
renderizarCarrito();

function ajax(){
    const http = new XMLHttpRequest();
    const url = 'http://127.0.0.1:5500/contact.html' //Se deja la URL del LiveServer.

    http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){
            console.log(this.responseText);
            document.getElementById('response').innerHTML = this.responseText;
        }
    }
    http.open('GET', url);
    http.send();
}
document.getElementById('boton').addEventListener('click',function(){
    ajax();
})

function enviarDatos() {
    var nombre = document.getElementById('nombre').value
    var apellido = document.getElementById('apellido').value
    var email = document.getElementById('email').value

    var datosForm = new FormData()
    datosForm.append('nombre', nombre)
    datosForm.append('apellido', apellido)
    datosForm.append('email', email)

    var param = {
        method: 'post',
        body: datosForm,
        mode: 'cors' ,
        cache: 'no-cache'
    }
    var charge = window.location.href = "http://127.0.0.1:5500/index.html" //ver porque no funciona
    var url = charge;

    fetch(url, param)
    .then(function(resp) {
        if (resp.ok) {
            return resp.text()
        } else {
            console.log(resp)
            throw 'error en el envio al servidor'
        }
    })
    .then(function(mensaje) {
        alert(mensaje)
    })
    .catch(function(error) {
        alert(error)
    })
}