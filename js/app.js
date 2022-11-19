(function() {
    let DB;

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

        if(window.indexedDB.open('crm', 1)) {
            obtenerBomberos();
        }

    });

    // Código de IndexedDB
    function crearDB() {
        // crear base de datos con la versión 1
        const crearDB = window.indexedDB.open('crm', 1);

        // si hay un error, lanzarlo
        crearDB.onerror = function() {
            console.log('Hubo un error');
        };

        // si todo esta bien, asignar a database el resultado
        crearDB.onsuccess = function() {
            // guardamos el resultado
            DB = crearDB.result;
        };

        // este método solo corre una vez
        crearDB.onupgradeneeded = function(e) {
            // el evento que se va a correr tomamos la base de datos
            const db = e.target.result;


            // definir el objectstore, primer parametro el nombre de la BD, segundo las opciones
            // keypath es de donde se van a obtener los indices
            const objectStore = db.createObjectStore('crm', { keyPath: 'id',  autoIncrement: true } );

            //createindex, nombre y keypath, 3ro los parametros
            objectStore.createIndex('nombre', 'nombre', { unique: false } );
            objectStore.createIndex('apellidop', 'apellidop', { unique: false } );
            objectStore.createIndex('apellidom', 'apellidom', { unique: false } );
            objectStore.createIndex('rut', 'rut', { unique: true });
            objectStore.createIndex('registrocpo', 'registrocpo', { unique: true } );
            objectStore.createIndex('registrocia', 'registrocia', { unique: true });
            objectStore.createIndex('edad', 'edad', { unique: false });
            objectStore.createIndex('sexo', 'sexo', { unique: false });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('direccion', 'direccion', { unique: false });
            objectStore.createIndex('alergico', 'alergico', { unique: false });
            objectStore.createIndex('peso', 'peso', { unique: false });
            objectStore.createIndex('estatura', 'estatura', { unique: false });
            objectStore.createIndex('patologia', 'patologia', { unique: false });
            objectStore.createIndex('hipertenso', 'hipertenso', { unique: false });
            objectStore.createIndex('diabetico', 'diabetico', { unique: false });
            objectStore.createIndex('cirugias', 'cirugias', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true } );

            console.log('Database creada y lista');
        };

    }


    function obtenerBomberos() {

        let abrirConexion = window.indexedDB.open('crm', 1);

        // si hay un error, lanzarlo
        abrirConexion.onerror = function() {
            console.log('Hubo un error');
        };

        // si todo esta bien, asignar a database el resultado
        abrirConexion.onsuccess = function() {
            // guardamos el resultado
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');


            // retorna un objeto request o petición,
            objectStore.openCursor().onsuccess = function(e) {
                 // cursor se va a ubicar en el registro indicado para accede ra los datos
                 const cursor = e.target.result;

                //  console.log(e.target);

                 if(cursor) {
                     const { nombre, apellidop, apellidom, rut, registrocpo, registrocia, edad, sexo, telefono, direccion, alergico, peso, estatura, patologia, hipertenso, diabetico, cirugias, id } = cursor.value;

                    const listadoBomberos = document.querySelector('#listado-bomberos');
                     listadoBomberos.innerHTML += `

                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700 font-bold">${apellidop}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700 font-bold">${apellidom}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700 font-bold">${rut}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700 font-bold">${registrocpo}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700 font-bold">${registrocia}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700 font-bold">${edad}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                                <p class="text-gray-700 font-bold">${sexo}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                                <p class="text-gray-700 font-bold">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                                <p class="text-gray-700 font-bold">${direccion}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                                <p class="text-gray-700 font-bold">${alergico}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                                <p class="text-gray-700 font-bold">${peso}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                                <p class="text-gray-700 font-bold">${estatura}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                                <p class="text-gray-700 font-bold">${patologia}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                                <p class="text-gray-700 font-bold">${hipertenso}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                                <p class="text-gray-700 font-bold">${diabetico}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">
                                <p class="text-gray-700 font-bold">${cirugias}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="editar-bombero.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                <a href="#" data-bombero="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
                            </td>
                        </tr>
                    `;

                    cursor.continue();
                 } else {
                    //  console.log('llegamos al final...');
                 }
             };



        };


    }


})();