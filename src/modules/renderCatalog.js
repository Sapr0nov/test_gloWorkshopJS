import filters from "./filters";

export default function renderCatalog(){
    const   cards = document.querySelectorAll('.goods .card'),
            catalogList = document.querySelector('.catalog-list'),
            catalogWrapper = document.querySelector('.catalog'),
            catalogBtn = document.querySelector('.catalog-button');
    let     categories = new Set();
            // get all categories in cards
            categories.add('Все');
            cards.forEach(card => {
                categories.add(card.dataset.category);
            });
            // form menu list
            categories.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                catalogList.appendChild(li);
            });
    catalogBtn.addEventListener('click',()=> {
        (catalogWrapper.style.display=='none') ? catalogWrapper.style.display = 'block' : catalogWrapper.style.display = 'none';
        if (event && event.target.tagName == 'LI') {
            // remove class for all li element and add "active" class for choose element
            document.querySelectorAll('.catalog-list li').forEach(element => element.className = '' );
            event.target.className = "active"; 
        } 
        filters();
    })
}