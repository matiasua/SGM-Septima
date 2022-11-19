(function() {

    let DB;
    let idBombero;
    const formulario = document.querySelector('#formulario');

    const nombreInput = document.querySelector('#nombre');
    const apellidopInput = document.querySelector('#apellidop');
    const apellidomInput = document.querySelector('#apellidom');
    const rutInput = document.querySelector('#rut');
    const registrocpoInput = document.querySelector('#registrocpo');
    const registrociaInput = document.querySelector('#registrocia');
    const edadInput = document.querySelector('#edad');
    const sexoInput = document.querySelector('#sexo');
    const telefonoInput = document.querySelector('#telefono');
    const direccionInput = document.querySelector('#direccion');
    const alergicoInput = document.querySelector('#alergico');
    const pesoInput = document.querySelector('#peso');
    const estaturaInput = document.querySelector('#estatura');
    const patologiaInput = document.querySelector('#patologia');
    const hipertensoInput = document.querySelector('#hipertenso');
    const diabeticoInput = document.querySelector('#diabetico');
    const cirugiasInput = document.querySelector('#cirugias');

    document.addEventListener('DOMContentLoaded', () => {


        conectarDB();

        //
        formulario.addEventListener('submit', actualizarBombero);


        // Verificar si el bombero existe
        const parametrosURL = new URLSearchParams(window.location.search);
        idBombero = parametrosURL.get('id');
        if(idBombero) {

            setTimeout( () => {
                obtenerBombero(idBombero);
            }, 100);
        }

    });


    function conectarDB() {
        // ABRIR CONEXIÓN EN LA BD:

        let abrirConexion = window.indexedDB.open('crm', 1);

        // si hay un error, lanzarlo
        abrirConexion.onerror = function() {
            console.log('Hubo un error');
        };

        // si todo esta bien, asignar a database el resultado
        abrirConexion.onsuccess = function() {
            // guardamos el resultado
            DB = abrirConexion.result;
        };
    }


    function obtenerBombero(id) {

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        console.log(objectStore);

        var request = objectStore.openCursor();
        request.onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                if(cursor.value.id  == id ) {
                    // pasar el que estamos editando...
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        };

    }

    function llenarFormulario(datosBomberos) {
        const { nombre, apellidop, apellidom, rut, registrocpo, registrocia, edad, sexo, telefono, direccion, alergico, peso, estatura, patologia, hipertenso, diabetico, cirugias } = datosBomberos;
         nombreInput.value = nombre;
         apellidopInput.value = apellidop;
         apellidomInput.value = apellidom;
         rutInput.value = rut;
         registrocpoInput.value = registrocpo;
         registrociaInput.value = registrocia;
         edadInput.value = edad;
         sexoInput.value = sexo;
         telefonoInput.value = telefono;
         direccionInput.value = direccion;
         alergicoInput.value = alergico;
         pesoInput.value = peso;
         estaturaInput.value = estatura;
         patologiaInput.value = patologia;
         hipertensoInput.value = hipertenso;
         diabeticoInput.value = diabetico;
         cirugiasInput.value = cirugias;
    }

    function actualizarBombero(e) {
        e.preventDefault();

        if (nombreInput.value === '' || apellidopInput.value === '' || apellidomInput.value === '' || rutInput.value === '' || registrocpoInput.value === '' || registrociaInput.value === '' || edadInput.value === '' || sexoInput.value === '' || telefonoInput.value === '' || direccionInput.value === '' || alergicoInput.value === '' || pesoInput.value === '' || estaturaInput.value === '' || patologiaInput.value === '' || hipertensoInput.value === '' || diabeticoInput.value === '' || cirugiasInput.value === '' ) {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        // actualizar...
        const bomberoActualizado = {
            nombre: nombreInput.value,
            apellidop: apellidopInput.value,
            apellidom: apellidomInput.value,
            rut: rutInput.value,
            registrocpo: registrocpoInput.value,
            registrocia: registrociaInput.value,
            edad: edadInput.value,
            sexo: sexoInput.value,
            telefono: telefonoInput.value,
            direccion: direccionInput.value,
            alergico: alergicoInput.value,
            peso: pesoInput.value,
            estatura: estaturaInput.value,
            patologia: patologiaInput.value,
            hipertenso: hipertensoInput.value,
            diabetico: diabeticoInput.value,
            cirugias: cirugiasInput.value,
            id: Number( idBombero )
        };

        console.log(bomberoActualizado)


        // actualizar...
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.put(bomberoActualizado);

        transaction.oncomplete = () => {
            imprimirAlerta('Editado Correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        };

        transaction.onerror = (error) => {
            console.log(error);
            console.log('Hubo un errorr.');
        };
    }


    function imprimirAlerta(mensaje, tipo) {
        // Crea el div

        const divMensaje = document.createElement('div');
        divMensaje.classList.add( "px-4", "py-3", "rounded",  "max-w-lg", "mx-auto", "mt-6", "text-center" );

        if(tipo === 'error') {
           divMensaje.classList.add('bg-red-100', "border-red-400", "text-red-700");
        } else {
            divMensaje.classList.add('bg-green-100', "border-green-400", "text-green-700");
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el DOM
       formulario.appendChild(divMensaje);

        // Quitar el alert despues de 3 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
   }



})();