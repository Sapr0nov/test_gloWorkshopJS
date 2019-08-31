import filters from "./filters";

export default function toggleCheckbox(){
    const checkbox = document.querySelectorAll('.filter-check-checkbox');
    checkbox.forEach(function(element) {
        element.addEventListener('change', ()=> {
            (element.checked) ? element.nextElementSibling.classList.add('checked') : element.nextElementSibling.classList.remove('checked');
            filters();
        })
    })
}