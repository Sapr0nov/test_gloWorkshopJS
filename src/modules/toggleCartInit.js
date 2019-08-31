import calcTotal from "./calcTotal";
import filters from "./filters";

export default function toggleCartInit() {
    const   cartBtn = document.querySelector('#cart'),
            closeBtn = document.querySelector('.cart-close'),
            modalCart = document.querySelector('.cart'),
            minPrice = document.querySelector('#min'),
            maxPrice = document.querySelector('#max'),
            search = document.querySelector('.search-wrapper-input'),
            searchBtn = document.querySelector('.search-btn');
    document.addEventListener('click', (event)=> {
        if (event.target.className === 'cart') {
            modalCart.style.display = "none";
            document.body.style.overflow = "";
        }
        cartBtn.addEventListener('click', ()=> {
        modalCart.style.display = "block";
        document.body.style.overflow = "hidden";
        });
        calcTotal(modalCart);
    });
    closeBtn.addEventListener('click', ()=> {
    modalCart.style.display = "none";
    document.body.style.overflow = "";
    });
    maxPrice.addEventListener('change', filters);
    minPrice.addEventListener('change', filters);
    search.addEventListener('change', filters);
    searchBtn.addEventListener('change', filters);
    search.addEventListener('keyup',filters);
    }