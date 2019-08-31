export default function calcTotal(cart) {
    const   cards = cart.querySelectorAll('.card'),
            totalText = document.querySelector('.cart-total > span');
    var     sum = 0;
    cards.forEach(function(card) {
        const   goodPrice = parseFloat(card.querySelector('.card-price').textContent), // get Price in card
                goodNumber = parseFloat(card.querySelector('.number-sticker').textContent); // get Number in card
                sum += goodPrice * goodNumber; 
    }) // add Space after each three simbol of cost. Example "33 500", "12 325 524" 
    totalText.textContent = (parseFloat(sum).toFixed(0)).toString().replace(/(\d)(?=(\d{3})+($|\.))/g, '$1 ');
}