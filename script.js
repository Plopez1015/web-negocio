document.addEventListener('DOMContentLoaded', () => {
    // Variables del carrito de compras
    const menuButtons = document.querySelectorAll('.menu-btn');
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const productsTitle = document.getElementById('products-title');
    let cart = [];

    // Actualiza el contenido del carrito
    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="product-card">
                    <img src="${item.image}" alt="${item.name}" />
                    <h2>${item.name}</h2>
                    <p>S/ ${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
            `;
            cartList.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `S/ ${total.toFixed(2)}`;
        cartBtn.textContent = `Carrito (${cart.reduce((acc, item) => acc + item.quantity, 0)})`;
    }

    // Añade un producto al carrito
    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
    }

    // Maneja el evento de clic en los botones de añadir al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const product = products.find(p => p.id === productId);
            addToCart(product);
        });
    });

    // Filtra los productos por categoría
    menuButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);

            document.getElementById('product-list').innerHTML = filteredProducts.map(product => `
                <li class="product-item">
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" />
                        <h2>${product.name}</h2>
                        <p>S/ ${product.price.toFixed(2)}</p>
                        <button class="add-to-cart" data-product-id="${product.id}">Agregar al carrito</button>
                    </div>
                </li>
            `).join('');

            // Cambia el título según la categoría seleccionada
            productsTitle.textContent = category === 'all' ? 'Todos los Productos' : `Productos de ${category.charAt(0).toUpperCase() + category.slice(1)}`;

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.dataset.productId;
                    const product = products.find(p => p.id === productId);
                    addToCart(product);
                });
            });
        });
    });

    // Muestra u oculta el modal del carrito
    cartBtn.addEventListener('click', () => {
        const rect = cartBtn.getBoundingClientRect();
        cartModal.style.top = `${rect.bottom + window.scrollY}px`;
        cartModal.style.left = `${rect.left}px`;
        cartModal.classList.toggle('hidden');
    });

    // Productos de ejemplo
    const products = [
        { id: '1', name: 'Detergente', price: 10.00, category: 'limpieza', image: 'imagenes/producto.jpg' },
        { id: '2', name: 'Shampoo', price: 15.00, category: 'cuidado-personal', image: 'imagenes/producto.jpg' },
        { id: '3', name: 'Escoba', price: 20.00, category: 'limpieza', image: 'imagenes/producto.jpg' },
        { id: '4', name: 'Aspiradora', price: 150.00, category: 'hogar', image: 'imagenes/producto.jpg' },
        { id: '5', name: 'Desinfectante', price: 25.00, category: 'limpieza', image: 'imagenes/producto.jpg' },
        { id: '6', name: 'Crema', price: 30.00, category: 'cuidado-personal', image: 'imagenes/producto.jpg' },
        { id: '7', name: 'Cafetera', price: 75.00, category: 'hogar', image: 'imagenes/producto.jpg' },
        { id: '8', name: 'Oferta Especial', price: 5.00, category: 'ofertas', image: 'imagenes/producto.jpg' }
    ];

    // Inicializa la vista de todos los productos
    document.querySelector('.menu-btn[data-category="all"]').click();

    // Variables del carrusel
    const carousel = document.querySelector('.sponsors-carousel');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    const items = document.querySelectorAll('.sponsor-item');
    const itemWidth = items[0].offsetWidth;
    let currentIndex = 0;

    // Actualiza la posición del carrusel
    function updateCarousel() {
        carousel.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    // Maneja el evento de clic en el botón anterior del carrusel
    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Maneja el evento de clic en el botón siguiente del carrusel
    nextButton.addEventListener('click', function () {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Repite el carrusel infinitamente
    setInterval(function () {
        if (currentIndex < items.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 3000); // Cambia cada 3 segundos
});
