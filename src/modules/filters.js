export default function filters() {
    const   cards = document.querySelectorAll('.goods .card'),
            discountCheckbox = document.querySelector('#discount-checkbox'),
            presenceCheckbox = document.querySelector('#discount-presence'),
            topCheckbox = document.querySelector('#discount-top'),
            minPrice = document.querySelector('#min'),
            maxPrice = document.querySelector('#max'),
            search = document.querySelector('.search-wrapper-input'),
            searchText = new RegExp(search.value.trim(), 'i');
    // do all card visible
    cards.forEach((card)=> {card.parentElement.style.display = "block";});
    // hide card under the filters

    cards.forEach((card)=> {
        if (discountCheckbox.checked) {
            if (!card.querySelector('.card-sale')) {
                card.parentElement.style.display = "none";
            }
        }
        if (presenceCheckbox.checked) {
            if (!card.querySelector('.card-sale')) {
                card.parentElement.style.display = "none";
            }
        }
        if (topCheckbox.checked) {
            if (!card.querySelector('.card-sale')) {
                card.parentElement.style.display = "none";
            }
        }
         if (parseFloat(minPrice.value) > 0 && parseFloat(card.querySelector('.card-price').textContent) < parseFloat(minPrice.value)) {
            card.parentElement.style.display = "none";
        }
        if (parseFloat(maxPrice.value) > 0 && parseFloat(card.querySelector('.card-price').textContent) > parseFloat(maxPrice.value)) {
            card.parentElement.style.display = "none";
        }
        if (searchText.length > 0 ) { console.log(searchText)}
        if (! searchText.test(card.querySelector('.card-title').textContent)) {
            card.parentElement.style.display = "none";
        }
         if (document.querySelector('.catalog-list > .active') && (document.querySelector('.catalog-list > .active')!==document.querySelector('.catalog-list > li:first-child')) ) {
            if (card.dataset.category !== document.querySelector('.catalog-list > .active').textContent) {
                card.parentElement.style.display = 'none';         
            }
    }
    });
}