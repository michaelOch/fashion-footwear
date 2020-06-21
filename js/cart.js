const selectAll = document.querySelector('.select-all');
const selectAllMobile = document.querySelector('.select-all_mobile');
const cart = document.querySelector('tbody');
const orderTotalDOM = document.querySelector('.order-total');
const shippingFeeDOM = document.querySelector('.shipping-fee');
const totalDOM = document.querySelector('.total');

let itemUnitPrice = {};

// Populate the Unit Price Object for cart items
Array.from(cart.children).forEach((item) => {
    itemUnitPrice[item.id] = item.childNodes[7].childNodes[1].childNodes[0].textContent;
});

//  Format Number
function formatNumber(n) {
    return n > 9 ? `${n}` : `0${n}`;
}

//  Calculate Total Order
function calcOrderTotal() {
    let orderTotal = 0;
    let cartItems = document.querySelectorAll('.cart-item');
    let cartItemsArr = Array.from(cartItems);
    cartItemsArr.map(item => {
        if(item.checked) {
            orderTotal += parseFloat(item.parentElement.parentElement.parentElement.childNodes[7].childNodes[1].textContent);
        }
    });

    return orderTotal.toFixed(2);
}

//  Calculate Total (with shipping fee)
function calcTotal() {
    if(parseFloat(orderTotalDOM.textContent) > 0){
        let totalAmount = parseFloat(orderTotalDOM.textContent) + parseFloat(shippingFeeDOM.textContent);
        return totalAmount.toFixed(2);
    }

    return '0.00';
}

//  Add Event Listeners
document.addEventListener('click', handleEvents);

function handleEvents(e) {

    orderTotalDOM.textContent = calcOrderTotal();
    totalDOM.textContent = calcTotal();

    //  SelectAll Event
    if(e.target.classList.contains('select-all')) {
        let cartItems = document.querySelectorAll('.cart-item');
        let cartItemsArr = Array.from(cartItems);
        if(e.target.checked === true) {
            cartItemsArr.map(item => {
                item.checked = true;
            });
        } else {
            cartItemsArr.map(item => {
                item.checked = false;
            });
        }

        //  Update Order Total
        orderTotalDOM.textContent = calcOrderTotal();
        totalDOM.textContent = calcTotal();
    }

    // Uncheck Select All whenever an individual cart item is checked
    if(e.target.classList.contains('cart-item')) {
        if(selectAll.checked) {
            selectAll.checked = false;
        }
    }

    //  Cart Item Count Decrement
    if(e.target.classList.contains('decrement')) {
        let itemId = e.target.parentElement.parentElement.parentElement.id;
        let quantity = Number(e.target.parentElement.childNodes[3].textContent);
        quantity -= 1;
        if(quantity >= 1) {
            e.target.parentElement.childNodes[3].textContent = formatNumber(quantity);
        } else {
            e.target.parentElement.childNodes[3].textContent = formatNumber(0);
        }

        let amount = itemUnitPrice[itemId] * parseFloat(e.target.parentElement.childNodes[3].textContent);
        e.target.parentElement.parentElement.parentElement.childNodes[7].childNodes[1].textContent = amount.toFixed(2);
        e.target.parentElement.parentElement.parentElement.childNodes[3].childNodes[9].childNodes[1].textContent = amount.toFixed(2);

        //  Update Order Total
        orderTotalDOM.textContent = calcOrderTotal();
        totalDOM.textContent = calcTotal();
    }

    //  Cart Item Count Increment
    if(e.target.classList.contains('increment')) {
        let itemId = e.target.parentElement.parentElement.parentElement.id;
        let quantity = Number(e.target.parentElement.childNodes[3].textContent);
        quantity += 1;
        if(quantity >= 1) {
            e.target.parentElement.childNodes[3].textContent = formatNumber(quantity);
        } else {
            e.target.parentElement.childNodes[3].textContent = formatNumber(0);
        }

        let amount = itemUnitPrice[itemId] * parseFloat(e.target.parentElement.childNodes[3].textContent);
        e.target.parentElement.parentElement.parentElement.childNodes[7].childNodes[1].textContent = amount.toFixed(2);
        e.target.parentElement.parentElement.parentElement.childNodes[3].childNodes[9].childNodes[1].textContent = amount.toFixed(2);

        //  Update Order Total
        orderTotalDOM.textContent = calcOrderTotal();
        totalDOM.textContent = calcTotal();
    }

    // Remove Item from Cart - Desktop
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.parentElement.remove();

        //  Update Order Total
        orderTotalDOM.textContent = calcOrderTotal();
        totalDOM.textContent = calcTotal();
    }

    // Remove Item from Cart - Mobile
    if(e.target.classList.contains('delete-mobile')) {
        e.target.parentElement.parentElement.parentElement.parentElement.remove();

        //  Update Order Total
        orderTotalDOM.textContent = calcOrderTotal();
        totalDOM.textContent = calcTotal();
    }
}