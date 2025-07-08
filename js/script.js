window.addEventListener("load", inicio);

function inicio(){
    // Login Usuario
    document.querySelector("#btnIngresar").addEventListener("click", iniciarSecion);
    document.querySelector("#btnLogout").addEventListener("click", cerrarSecion);
}

// Variable global usuraio logueado
let usuarioLogueado = null

// Creando clase Usuario y tener por predeterminado 3 usuarios
class Usuario {
    constructor(usuario, contraseña){
        this.usuario = usuario;
        this.contraseña = contraseña;
    }
}

const listaUsuarios = [
    new Usuario("administrador", "123456"),
    new Usuario("juanLopez", "jp54110"),
    new Usuario("LorenCardoso", "lorenacardoso123"),
]

// Funcion de iniciar sesion

function iniciarSecion(){
    let usuario = document.querySelector("#txtUsuario").value;
    let contraseña = document.querySelector("#txtContraseña").value;
    let mensaje = document.querySelector("#mensajeIniciarSesion");

    // Encontrar usuario en la lista
    let encontrado = listaUsuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);
    if(encontrado){
        usuarioLogueado = encontrado
        alert('Bienvenido, ${usuarioLogueado.usuario}!');
        mensaje = ""

        document.querySelector("#divPaginaLogin").style.display = "none";
        document.querySelector("#divPaginaPrincipal").style.display = "flex";
    } else{
        mensaje = "Usuario o contraseña incorrectos."
    }
}

// Funcion de cerrar sesion

function cerrarSecion(){
    usuarioLogueado = null

    document.querySelector("#divPaginaLogin").style.display = "block";
    document.querySelector("#divPaginaPrincipal").style.display = "none";

    document.querySelector("#txtUsuario").value = "";
    document.querySelector("#txtContraseña").value = "";
    document.querySelector("#mensajeIniciarSesion").textContent = "";
}