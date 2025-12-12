document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------------------------
    // Lógica para la Landing Page (index.html) - CONTROL DE CARDS
    // -------------------------------------------------------------------
    const productList = document.getElementById('product-list');
    const showMoreBtn = document.getElementById('show-more-btn');
    const showMoreContainer = document.getElementById('show-more-container');
    
    if (productList) {
        const cards = productList.querySelectorAll('.product-card');
        const limitByRows = 4; // Límite de 4 filas
        const columns = 3;     // 3 columnas
        const initialLimit = limitByRows * columns; // Límite inicial: 12 cards

        /**
         * Función para aplicar la lógica de ocultamiento/mostrado.
         * En un proyecto real con Django, la paginación se haría en el backend.
         * Aquí, simulamos esa paginación en el frontend.
         */
        function initializeCardDisplay() {
            cards.forEach((card, index) => {
                if (index >= initialLimit) {
                    // Si el índice excede el límite inicial, lo ocultamos por defecto
                    card.style.display = 'none';
                    card.setAttribute('data-visible', 'false');
                } else {
                    // Las que están dentro del límite, las mostramos
                    card.style.display = 'block';
                    card.setAttribute('data-visible', 'true');
                }
            });

            // Ocultamos el botón si todos los productos caben en el límite inicial
            if (cards.length <= initialLimit) {
                showMoreContainer.style.display = 'none';
            }
        }

        /**
         * Función que se ejecuta al presionar "Mostrar Más".
         */
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                // Iteramos sobre todas las cards
                cards.forEach(card => {
                    // Hacemos visible cualquier card que esté oculta
                    if (card.getAttribute('data-visible') === 'false') {
                         card.style.display = 'block';
                         card.setAttribute('data-visible', 'true');
                    }
                });
                
                // Una vez que todas se han mostrado, ocultamos el botón
                showMoreContainer.style.display = 'none';
                showMoreBtn.remove(); // Opcional: remover el botón del DOM
            });
        }
        
        // Ejecutamos la función al cargar la página si el botón existe
        if (showMoreBtn) {
            initializeCardDisplay();
        }
        
        console.log("Landing Page: Lógica de 'Mostrar Más' inicializada.");
    }


    // -------------------------------------------------------------------
    // Lógica para el Formulario (formulario.html)
    // -------------------------------------------------------------------
    const productForm = document.getElementById('product-form');

    if (productForm) {
        productForm.addEventListener('submit', function(event) {
            // Previene el envío del formulario por defecto (comportamiento que manejará Django)
            event.preventDefault(); 
            
            // Recolección de datos
            const name = document.getElementById('name').value;
            const price = document.getElementById('price').value;
            // ... y otros campos
            
            // Simulación de envío de datos al backend
            console.log(`Intentando cargar producto: ${name} con precio $${price}`);
            
            // En un entorno real de Django, aquí se haría una petición POST 
            // al backend (o se dejaría que Django maneje el envío de formulario tradicional).

            alert(`✅ Producto "${name}" listo para ser guardado en la base de datos de Django!`);
            
            // Limpiar el formulario después de la "carga"
            productForm.reset();
        });
    }

    // -------------------------------------------------------------------
    // Lógica para la Página de Detalles (detail.html) - Galería
    // -------------------------------------------------------------------

    // Verificamos si los elementos de la galería existen en la página
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // 1. Obtener la fuente de la miniatura
                const newSrc = thumbnail.getAttribute('src');

                // 2. Actualizar la imagen principal
                mainImage.setAttribute('src', newSrc.replace('100x70', '600x400'));
                
                // Nota: En Django, probablemente solo actualizarías la URL de la imagen principal.
                // Aquí usamos un truco de placeholder para simular el cambio de tamaño.

                // 3. Manejar la clase 'active' para el estilo
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        });
        console.log("Detalles del Producto: Lógica de la galería inicializada.");
    }

});