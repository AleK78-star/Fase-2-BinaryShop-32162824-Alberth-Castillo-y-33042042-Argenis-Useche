

    document.addEventListener("DOMContentLoaded", () => {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    // Administrador base por defecto
    const adminExiste = usuarios.find(u => u.nickname === "admin");
    if (!adminExiste) {
        usuarios.push({
            nombre: "Administrador",
            apellido: "General",
            direccion: "Sistema",
            nickname: "admin",
            contraseña: "qweasdzxc123.",
            rol: "admin",
            activo: true
        });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // REGISTRO
    const formRegistro = document.getElementById("form-registro");
    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("reg-nombre").value;
            const apellido = document.getElementById("reg-apellido").value;
            const direccion = document.getElementById("reg-direccion").value;
            const nickname = document.getElementById("reg-nickname").value.trim();
            const contraseña = document.getElementById("reg-contraseña").value;
            const rol = document.getElementById("reg-rol").value;

            if (nickname.toLowerCase() === "admin") {
                alert("El nickname 'admin' está reservado.");
                return;
            }

            if (usuarios.some(u => u.nickname === nickname)) {
                alert("Este nickname ya está registrado.");
                return;
            }

           
            const activo = (rol === "vendedor") ? false : true;

            usuarios.push({ nombre, apellido, direccion, nickname, contraseña, rol, activo });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            if (rol === "vendedor") {
                alert("¡Registro exitoso! Tu cuenta de vendedor ha sido enviada al administrador para su habilitación.");
            } else {
                alert("¡Registro exitoso! Ya puedes iniciar sesión.");
            }
            window.location.href = "login.html";
        });
    }

    //LOGIN 
    const formInicio = document.getElementById("form-Inicio");
    if (formInicio) {
        formInicio.addEventListener("submit", (e) => {
            e.preventDefault();
            const nickname = document.getElementById("ini-nickname").value.trim();
            const contraseña = document.getElementById("ini-contraseña").value;

            const usuarioEncontrado = usuarios.find(u => u.nickname === nickname && u.contraseña === contraseña);

            if (!usuarioEncontrado) {
                alert("Nickname o contraseña incorrectos.");
                return;
            }

            // Validar si el vendedor está activo
            if (usuarioEncontrado.rol === "vendedor" && !usuarioEncontrado.activo) {
                alert("Tu cuenta de vendedor aún no ha sido habilitada por el administrador.");
                return;
            }

            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

            if (usuarioEncontrado.rol === "admin") {
                window.location.href = "admin.html";
            } else if (usuarioEncontrado.rol === "vendedor") {
                window.location.href = "vendedor.html";
            } else {
                window.location.href = "catalogo.html"; // Tu catálogo actual
            }
        });
    }
});


// Simular ventas de ejemplo 
const ventasDeEjemplo = [
    {
        titulo: "HP PC de escritorio Business Tower",
        precio: 849,
        cantidad: 1,
        imagen: "Imagenes/712dRtjXi4L._AC_SX466_.jpg",
        vendedor: "Argenis78",
        comprador: "comprador_prueba",
        fecha: "24/10/2026"
    },
    {
        titulo: "Altavoces duales potentes",
        precio: 45,
        cantidad: 2,
        imagen: "Imagenes/71TIvrNBwIL._AC_SX466_.jpg",
        vendedor: "Alberth51", 
        comprador: "otro_comprador",
        fecha: "25/10/2026"
    }
];


localStorage.setItem("ventas", JSON.stringify(ventasDeEjemplo));


//Catalaogo

// PRODUCTOS
const productos = [
    // Computadoras
    {
        id: "PC-01",
        titulo: "HP PC de escritorio Business Tower, procesador Intel i5, 32 GB de RAM",
        imagen: "Imagenes/712dRtjXi4L._AC_SX466_.jpg",
        categoria: {
            nombre: "Computadoras",
            id: "computadoras"
        },
        precio: 849
    },
    {
        id: "PC-02",
        titulo: "ZOTAC MEK Gaming PC de escritorio, Ryzen 7 9800X3D, NVIDIA GeForce RTX 5080",
        imagen: "Imagenes/817ItR7k85L._AC_SX466_.jpg",
        categoria: {
            nombre: "Computadoras",
            id: "computadoras"
        },
        precio: 4549
    },
    {
        id: "PC-03",
        titulo: "PC i5 CPU Up to 3.6GHz, Solo graficos integrados, 256 GB M.2, 8 GB RAM, ",
        imagen: "Imagenes/71VCaGktrdL._AC_SY679_.jpg",
        categoria: {
            nombre: "Computadoras",
            id: "computadoras"
        },
        precio: 259
    },
    {
        id: "PC-04",
        titulo: "Dell Torre de escritorio Pro 2026 16GB DDR5 RAM 512GB SSD, Windows 11 Pro",
        imagen: "Imagenes/81vJNxS10ZL._AC_SX466_.jpg",
        categoria: {
            nombre: "Computadoras",
            id: "computadoras"
        },
        precio: 739
    },
    {
        id: "PC-05",
        titulo: "CyberPowerPC PC para juegos, AMD Ryzen 7 8700F, GeForce RTX 5060 Ti 8GB",
        imagen: "Imagenes/71+2GM2dfiL._AC_SX466_.jpg",
        categoria: {
            nombre: "Computadoras",
            id: "computadoras"
        },
        precio: 1499
    },
    // Electronicos
    {
        id: "Electronicos-01",
        titulo: "ElASUS ROG Astral GeForce RTX 5090 Edition 20 OC, 32 GB GDDR7, PCIe 5.0, pantalla AMOLED",
        imagen: "Imagenes/612GzWm-CsL._AC_SX466_.jpg",
        categoria: {
            nombre: "Electronicos",
            id: "electronicos"
        },
        precio: 11199
    },
    {
        id: "Electronicos-02",
        titulo: "ASUS Tarjeta gráfica para juegos Dual Radeon RX 9060 XT de 16 GB GDDR6",
        imagen: "Imagenes/71WTt-GxSpL._AC_SX466_.jpg",
        categoria: {
            nombre: "Electronicos",
            id: "electronicos"
        },
        precio: 649
    },
    {
        id: "Electronicos-03",
        titulo: "Altavoces duales potentes, sistema PA de batería de 10 horas, USB TF AUX, fiesta en casa al aire",
        imagen: "Imagenes/71TIvrNBwIL._AC_SX466_.jpg",
        categoria: {
            nombre: "Electronicos",
            id: "electronicos"
        },
        precio: 45
    },
    {
        id: "Electronicos-04",
        titulo: "Govee Barra de luz inteligente, luces de TV RGBICWW para sala de estar",
        imagen: "Imagenes/71A5GUvWY1L._AC_SX679_.jpg",
        categoria: {
            nombre: "Electronicos",
            id: "electronicos"
        },
        precio: 45
    },
    {
        id: "Electronicos-05",
        titulo: "PlayStation DualSense Edge Control Inalambrico para PS5",
        imagen: "Imagenes/614v99L42vL._SX522_.jpg",
        categoria: {
            nombre: "Electronicos",
            id: "electronicos"
        },
        precio: 189
    },
    {
        id: "Electronicos-06",
        titulo: "Teclado Gamer, Mouse, MousePad y Auriculares Gamer - 4 in 1 Edition Hornet RX-250",
        imagen: "Imagenes/71S-pQNQyIL._SX522_.jpg",
        categoria: {
            nombre: "Electronicos",
            id: "electronicos"
        },
        precio: 49
    },
    {
        id: "Electronicos-07",
        titulo: "TONOR Juego de micrófonos para juegos con brazo Boom, micrófono condensador",
        imagen: "Imagenes/71dYNkQDMOL._AC_SX466_.jpg",
        categoria: {
            nombre: "Electronicos",
            id: "electronicos"
        },
        precio: 29
    },
    {
        id: "Electronicos-08",
        titulo: "Lámpara de pie de esquina, LED RGB con sincronización de música, aplicación inteligente y control remoto",
        imagen: "Imagenes/61WwgSzdikL._AC_SX679_.jpg",
        categoria: {
            nombre: "Electronicos",
            id: "electronicos"
        },
        precio: 24
    },
    // Fit
    {
        id: "Fit-01",
        titulo: "Amazfit Reloj inteligente Bip 6, pantalla AMOLED de 1.97, GPS, iOS/Android",
        imagen: "Imagenes/61UvVTN0IEL._AC_SX466_.jpg",
        categoria: {
            nombre: "Fit",
            id: "fit"
        },
        precio: 54
    },
    {
        id: "Fit-02",
        titulo: "FitBeast - Kit para fortalecer mano y dedos (5 accesorios), fortalece potencia de la mano y dedos y agarre, también fortalece la muñeca",
        imagen: "Imagenes/718tBdzFF6L._AC_SX679_.jpg",
        categoria: {
            nombre: "Fit",
            id: "fit"
        },
        precio: 9
    },
    {
        id: "Fit-03",
        titulo: "Amazon Basics - Mancuerna de entrenamiento de fácil agarre, con revestimiento de neopreno, disponibles en varios juegos y pesos",
        imagen: "Imagenes/81Y26toqdTL._AC_SX679_.jpg",
        categoria: {
            nombre: "Fit",
            id: "fit"
        },
        precio: 26
    },
    {
        id: "Fit-04",
        titulo: "XT Trainer - Gimnasio compacto en casa, estación de fitness todo en uno, sistema de resistencia de entrenamiento, equipo de entrenamiento de fuerza y máquina de peso de cable",
        imagen: "Imagenes/515l7IV7JtL._AC_SX679_.jpg",
        categoria: {
            nombre: "Fit",
            id: "fit"
        },
        precio: 299
    },
    {
        id: "Fit-05",
        titulo: "Trideer Pelota de yoga para ejercicio, embarazo, pelota de ejercicio",
        imagen: "Imagenes/61XRN-EDViL._AC_SX679_.jpg",
        categoria: {
            nombre: "Fit",
            id: "fit"
        },
        precio: 17
    }
];


const contenedorproductos = document.querySelector("#contenedorproductos");
const botonescategorias = document.querySelectorAll(".botonCategoria");
let botonesAgregar = document.querySelectorAll(".productoAgregar")
const numerito = document.querySelector(".numerito");

function cargarProductos(productosElegidos) {

    contenedorproductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="Productodetalles">
                <h3 class="productoTitulo">${producto.titulo}</h3>
                <p class="productoPrecio">${producto.precio}</p>
                <button class="productoAgregar" id="${producto.id}">Agregar</button>
        
        
        `;

        contenedorproductos.append(div);
    
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonescategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonescategorias.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
        
        const productosboton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosboton); 

        }
        else {
            cargarProductos(productos);
        }
    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".productoAgregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {

        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;


    }  else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    
    
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


function actualizarNumerito() {
    let Nuevonumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad,0);
    numerito.innerText = Nuevonumerito;
}