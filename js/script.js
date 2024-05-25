

$(document).ready(
    function() {
        // source: https://stackoverflow.com/questions/10466129/how-to-hide-bootstrap-modal-with-javascript
        $('#cart-modal').hide();
        $('#cart').click(function() {
            $('#cart-modal').show();
        });
        $('#cart-close-button').click(function() {
            $('#cart-modal').hide();
        })

        // for adding items to cart
        $('.add-to-cart-button').click( addItemToCart );

        // maintain cart
        const cart = new Map();
        
        populateCartList();

        // remove cart item
        // source: https://stackoverflow.com/questions/32152580/click-not-being-registered-on-button
        $(document).on('click', '.remove-product', function () {
            let productName = $(this).parent().parent().children('.product-name-price').children('.product-name').html();

            //  remove item from cart variable
            cart.delete(productName);

            let product = $(this).parent().parent().parent();
            //  remove the cart list item

            product.remove();
        })

        // modify cart item quantity and total

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
            
            populateCartList();
        }

        
        function populateCartList() {
            $('.cart-list').empty();
            cart.forEach(element => {
                //  creating parent list item
                let listItem = document.createElement('li');
                listItem.className='cart-list-item';

                //  creating img element
                let productImg = document.createElement('img');
                productImg.src=element.imageSrc;
                productImg.alt=element.imageAlt;
                listItem.appendChild(productImg);
                
                // creating product-details div
                let productDetails = document.createElement('div');
                productDetails.className="product-details";

                let productNamePrice = document.createElement('div');
                productNamePrice.className = "product-name-price";
                let productName = document.createElement('h4');
                productName.className = "libre-baskerville-h4-dark product-name";
                productName.append(element.name);

                productNamePrice.appendChild(productName);

                let productPrice = document.createElement('h4');
                productPrice.className = "source-sans-3-h4-dark product-price";
                productPrice.append('$' + String(element.price));

                productNamePrice.appendChild(productPrice);

                productDetails.appendChild(productNamePrice);

                let productQuantityMod = document.createElement('div');
                productQuantityMod.className = "product-quantity";
                let productQuantity = document.createElement('input');
                productQuantity.type = 'number';
                productQuantity.className = 'product-quantity-input';
                productQuantity.value=element.quantity;
                productQuantityMod.appendChild(productQuantity);

                let binButton = document.createElement('button');
                binButton.className = 'remove-product';
                binButton.type = 'button';
                let binIcon = document.createElement('img');
                binIcon.src = "images\\icons\\bin.svg";
                binButton.appendChild(binIcon);
                productQuantityMod.append(binButton);
                productDetails.appendChild(productQuantityMod);

                let totalPrice = document.createElement('h4');
                totalPrice.className = "libre-baskerville-h3-highlight";
                totalPrice.append('$' + String(element.total))

                productDetails.appendChild(totalPrice);
                listItem.appendChild(productDetails);
                $('.cart-list').append(listItem);
            });
        }
    }
)

