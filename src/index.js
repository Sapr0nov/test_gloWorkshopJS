'use strict';
import toggleCheckbox from "./modules/toggleCheckbox";
import toggleCartInit from "./modules/toggleCartInit";
import toggleCart from "./modules/toggleCart";
import renderCatalog from "./modules/renderCatalog";
import getData from "./modules/getData";
import renderCards from "./modules/renderCards";


(async function(){
    await getData();
    renderCatalog();
    toggleCartInit();
    toggleCheckbox();
    toggleCart();
}());
