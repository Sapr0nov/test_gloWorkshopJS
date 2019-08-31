export default function addCardCart(cartWrapper,cardClone,goodsNum) {
    {
        const   modalCart = document.querySelector('.cart'),
                cardCloneBtn = cardClone.querySelector('.btn');
        cardClone.appendChild(goodsNum);
        cartWrapper.appendChild(cardClone);
        cardCloneBtn.textContent = 'удалить'; // config added card
        // add function of remove (increment counter or remove card)
        cardCloneBtn.addEventListener('click', function() {
           (parseFloat(this.parentElement.parentElement.querySelector('.number-sticker').textContent)>1) ?                
           this.parentElement.parentElement.querySelector('.number-sticker').textContent = parseFloat(this.parentElement.parentElement.querySelector('.number-sticker').textContent) - 1
           : cardClone.remove();
            calcTotal(modalCart); // update total
            showData(cartWrapper);// update informers
        });
    }
}