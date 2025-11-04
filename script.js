
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-wOFz0aTqidjt0Z-sDMg1FlQsgRve1wTwFDD7MN_xTyzRP_XETmatUrELJ8hS6g/pub?output=csv';

$(document).ready(function() {
    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        
        const input = $('#dni-input').val().trim();
        
        $.ajax({
            url: csvUrl,
            type: 'GET',
            dataType: 'text',
            success: function(data) {
                const rows = data.split('\n');
                let found = false;

                rows.forEach(function(row) {
                    const columns = row.split(',');
                    const dni = columns[2].trim();
                    const name = columns[1].trim();
                    const pdfUrl = columns[3].trim();

                    if (dni === input || columns[0].trim() === input) {
                        $('#student-name').text(name);
                        $('#download-link').attr('href', pdfUrl);
                        $('#pdf-viewer').attr('src', pdfUrl).show();
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

    $('.btn-close').click(function() {
        $('#result-modal').fadeOut();
    });
});
