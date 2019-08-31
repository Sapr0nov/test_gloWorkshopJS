export default function renderCards(cards) {
    const   {goods} = cards,
            goodsWrapper = document.querySelector('.goods');
    goods.map(card => {
        const   cardHtml = document.createElement('div');
        cardHtml.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        cardHtml.innerHTML = `
        <div class="card" data-category="${card.category}">
            ${card.sale ? '<div class="card-sale"> Hot Sale🔥</div>' : ''}
            <div class="card-img-wrapper">
                <span class="card-img-top"
                    style="background-image: url('${card.img}')"></span>
            </div>
            <div class="card-body justify-content-between">
                <div class="card-price" style="${card.sale ? 'color: green;' : ''}">${card.price} ₽</div>
                <h5 class="card-title">${card.title}</h5>
                <button class="btn btn-primary">В корзину</button>
            </div>
        </div>
        `;
        goodsWrapper.appendChild(cardHtml);
    })
}