// URL del archivo CSV de Google Sheets
const csvUrl = 'https://docs.google.com/spreadsheets/d/1-TG8eeu0kQT3KDB7obAgnHNKUbyIRhs7/export?format=csv';  // Enlace del archivo CSV

$(document).ready(function() {
    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        
        // Obtener el DNI o código ingresado
        const input = $('#dni-input').val().trim();
        
        // Realizar la búsqueda en el CSV
        $.ajax({
            url: csvUrl,
            type: 'GET',
            dataType: 'text',
            success: function(data) {
                const rows = data.split('\n');
                let found = false;

                // Iterar sobre las filas del CSV
                rows.forEach(function(row) {
                    const columns = row.split(',');

                    // Obtener los valores de las columnas (Código de estudiante, DNI, Nombres y apellidos, URL)
                    const codigoEstudiante = columns[0].trim(); // Código de estudiante
                    const dni = columns[1].trim();             // DNI
                    const name = columns[2].trim();            // Apellidos y Nombres
                    const pdfUrl = columns[3].trim();          // URL del PDF

                    // Buscar por DNI o Código de estudiante
                    if (dni === input || codigoEstudiante === input) {
                        // Mostrar los resultados en el modal
                        $('#student-name').text('Nombre: ' + name);
                        $('#view-cert-button').attr('onclick', 'window.open("' + pdfUrl + '", "_blank")');
                        
                        // Mostrar el modal
                        $('#result-modal').fadeIn();
                        found = true;
                    }
                });

                if (!found) {
                    alert('No se encontró el estudiante.');
                }
            },
            error: function() {
                alert('Hubo un error al cargar el archivo.');
            }
        });
    });

    // Cerrar el modal al hacer clic fuera de él
    $('#result-modal').click(function(e) {
        if (e.target === this) {
            $(this).fadeOut();
        }
    });
});
