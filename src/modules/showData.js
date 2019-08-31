export default function showData(cartWrapper) {
    const   cartEmpty = document.querySelector('#cart-empty'),
            numberCardsCart = cartWrapper.querySelectorAll('.card').length, // lenght = number of card in cart
            cardsCart = cartWrapper.querySelectorAll('.number-sticker'), // array of divs with numbers sticker 
            countGoods = document.querySelector('.counter'); // sticker with Total Numbers
    let counter = 0;
    cardsCart.forEach((card) => { counter +=  parseFloat(card.textContent); })  // sum all divs with numbers
    countGoods.textContent = numberCardsCart + ' [' + counter + ']';
    (counter) ? cartEmpty.style.display="none" : cartEmpty.style.display="block"; 
}