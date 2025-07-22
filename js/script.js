window.addEventListener("load", inicio);

function inicio(){
    // Login Usuario
    document.querySelector("#btnIngresar").addEventListener("click", iniciarSecion);
    document.querySelector("#btnLogout").addEventListener("click", cerrarSecion);
    document.querySelector("#btnCalcular").addEventListener("click", calcularCredito);
    document.querySelector("#btnMagia").addEventListener("click", magia);
}

// Variable global usuraio logueado
let usuarioLogueado = null

// Creando clase Usuario y tener por predeterminado 3 usuarios
class Usuario {
    constructor(usuario, contraseña, tipoPersona){
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.tipoPersona = tipoPersona
    }
}

const listaUsuarios = [
    new Usuario("administrador", "123456", "fisica"),
    new Usuario("juanLopez", "jp54110", "fisica"),
    new Usuario("LorenCardoso", "lorenacardoso123","fisica"),
    new Usuario("Infusiones S.A.", "123456","juridica"),
    new Usuario("Roli S.A.", "654321","juridica"),
    new Usuario("Supeca S.A.S", "147258369","juridica"),
]

// Funcion de iniciar sesion

function iniciarSecion() {
    let usuario = document.querySelector("#txtUsuario").value;
    let contraseña = document.querySelector("#txtContraseña").value;
    let mensaje = document.querySelector("#mensajeIniciarSesion");

    let encontrado = listaUsuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);
    
    if (encontrado) {
        usuarioLogueado = encontrado;
        mensaje.textContent = "";

        // Mostrar página principal y ocultar login
        document.querySelector("#divPaginaLogin").style.display = "none";
        document.querySelector("#divPaginaPrincipal").style.display = "block";
        document.querySelector("#divEjercicio").style.display = "none";
       // Mostrar formulario de persona física 
       if (usuarioLogueado.tipoPersona === "fisica") {
        document.querySelector("#formPersonaFisica").style.display = "block";
    } else {
        document.querySelector("#formPersonaFisica").style.display = "none";
    }

} else {
    mensaje.textContent = "Usuario o contraseña incorrectos.";
}
}

// Funcion de cerrar sesion

function cerrarSecion() {
    usuarioLogueado = null;

    document.querySelector("#divPaginaLogin").style.display = "flex";
    document.querySelector("#divPaginaPrincipal").style.display = "none";

    document.querySelector("#txtUsuario").value = "";
    document.querySelector("#txtContraseña").value = "";
    document.querySelector("#mensajeIniciarSesion").textContent = "";
}

// Funcion de Calcular Credito para Personas Fisicas

function calcularCredito() {
    let ingresos = document.querySelector("#ingresos").value;
    let antiguedad = document.querySelector("#antiguedad").value;
    let monto = document.querySelector("#monto").value;
    let cuotas = document.querySelector("#cuotas").value;
    let mensaje = "";

    if (ingresos <= 0 || monto <= 0 || cuotas <= 0 || antiguedad === "") {
        mensaje = "Completa todos los campos con valores válidos.";
    } else {
        // Definir tasa progresiva
        let tasa = 0;
        if (monto <= 50000) {
            tasa = 0.50;
        } else if (monto <= 100000) {
            tasa = 0.54;
        } else if (monto <= 150000) {
            tasa = 0.58;
        } else {
            tasa = 0.62;
        }

        let montoFinal = monto * (1 + tasa);
        let cuotaMensual = montoFinal / cuotas;

        if (cuotaMensual > ingresos * 0.35) {
            mensaje = "Crédito rechazado: la cuota supera el 35% de tus ingresos.";
        } else if (antiguedad === "<1") {
            mensaje = "Crédito rechazado: necesitás al menos 1 año de antigüedad laboral.";
        } else if (monto > ingresos * 20 && antiguedad !== "2") {
            mensaje = "Crédito rechazado: el monto solicitado requiere al menos 2 años de antigüedad.";
        } else {
            mensaje = `
                <h3>Resultado del Crédito</h3>
                <table>
                    <tr>
                        <th>Monto solicitado</th>
                        <th>Monto total a pagar</th>
                        <th>Número de cuotas</th>
                        <th>Valor de cada cuota</th>
                    </tr>
                    <tr>
                        <td>$${monto}</td>
                        <td>$${montoFinal}</td>
                        <td>${cuotas}</td>
                        <td>$${cuotaMensual}</td>
                    </tr>
                </table>
            `;
        }
    }

    document.querySelector("#resultadoCredito").innerHTML = mensaje;
}

// Ejercicio de la Letra
function magia(){
    document.querySelector("#pMagia").innerHTML= "¡Hola, Mundo con JavaScript!"
}