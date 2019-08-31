import renderCards from "./renderCards";

export default function getData() {
    const goodsWrapper = document.querySelector('.err');
    return fetch('../../db/db.json')
    .then((response) => {
        if (response.ok) 
        {
            return response.json();
        }else{
            throw new Error ('Error, data not resive: ' + response.status);
        }  
    })
    .then(data => renderCards(data))
    .catch(err => {
        goodsWrapper.innerHTML = '<div style="color: red;">Ошибка: не удалось получить данные!</div>';
        console.warn('Error, data not resive: ' + err)
    });
}