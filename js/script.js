

$(document).ready(
    function() {
        $('.add-to-cart-button').click( addItemToCart );
        // maintain cart
        const cart = new Map();
        
        function addItemToCart() {
            const product = {}
            // retrieve item associated with button
            let button = $(this);
            
            parentTag = button.parent().parent();
            product.name=parentTag.children('.product-title').children('h4').html().trim();

            // check if product is already in cart
            let productInCart = cart.get(product.name);

            if (productInCart) {
                // if product in cart just increment
                console.log(productInCart);
                productInCart.quantity++;
                productInCart.total += productInCart.price;
            } else {
                // if product not in cart then add it
                product.price = Number(parentTag.children('.product-price').children('h4').html().trim().replace('$',''));
                product.total = product.price;
                product.quantity = 1;
                product.imageSrc = parentTag.children('.cs-link').children('.cs-picture').children('img').attr('src');
                product.imageAlt = parentTag.children('.cs-link').children('.cs-picture').children('img').attr('alt');
                console.log(product)
                cart.set(product.name, product)
            }
            console.log(cart)
            // add to cart count
            let cartCount = Number($( ' #cart-counter-value ').html());
            cartCount = cartCount + 1;
            $( ' #cart-counter-value ').text(cartCount);
            
        }
    }
)

