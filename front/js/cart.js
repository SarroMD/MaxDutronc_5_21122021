// Récapitulatif des articles du panier . ---------------------------------------------------------------------------------------------------------------------------------------------

//Initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produits"));
console.table(produitLocalStorage);

const ifEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart(){

if (!localStorage.getItem("produits")) {
    const emptyCart = '<p>Votre panier est vide</p>';
    ifEmptyCart.innerHTML = emptyCart;

} else {

for (let produits in produitLocalStorage){

    // Ajout de l'élément "article"
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', produitLocalStorage[produits].idProduit);

    // Ajout de l'élément "div"
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    // Ajout de l'image
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = produitLocalStorage[produits].imageProduit;
    productImg.alt = produitLocalStorage[produits].altImageProduit;
    
    // Ajout de l'élément "div"
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // Ajout de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";
    
    // Ajout du titre h3
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = produitLocalStorage[produits].nomProduit;

    // Ajout de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = produitLocalStorage[produits].couleurProduit;

    // Ajout du prix
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = produitLocalStorage[produits].prixProduit + " €";

    // Ajout de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Ajout de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    
    // Ajout de "Qté : "
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.innerHTML = "Qté : ";

    // Ajout de la quantité
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = produitLocalStorage[produits].quantiteProduit;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Ajout de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    // Ajout de "p" supprimer
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";

}
}}

getCart();

function getTotals(){

    // Récupération du total des quantités -----------------------------------------------------------------------------------------------------------------------------------------

    var itemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = itemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += parseInt(itemsQtt[i].value);
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;

    // Récupération du prix total -------------------------------------------------------------------------------------------------------------------------------------------------

    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (itemsQtt[i].value * produitLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}

getTotals();


// Modification d'éléments du panier . ---------------------------------------------------------------------------------------------------------------------------------------------

function modifyCart() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let j = 0; j < qttModif.length; j++){
        qttModif[j].addEventListener("change" , (event) => {
            event.preventDefault();

            let modifQuantite = produitLocalStorage[j].quantiteProduit;
            let qttModifValue = qttModif[j].value;
            
            const resultFind = produitLocalStorage.find( el => el.qttModifValue !== modifQuantite);

            resultFind.quantiteProduit = qttModifValue;
            produitLocalStorage[j].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produits", JSON.stringify(produitLocalStorage));
        
            // refresh rapide
            location.reload();
        })
    }
}

modifyCart();


// Suppression d'éléments du panier . ---------------------------------------------------------------------------------------------------------------------------------------------

function deleteProduct() {

    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let k = 0; k < btn_supprimer.length; k++){
        btn_supprimer[k].addEventListener("click" , (event) => {
            event.preventDefault();

            let idDelete = produitLocalStorage[k].idProduit;
            let colorDelete = produitLocalStorage[k].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            
            localStorage.removeItem("produits", JSON.stringify(produitLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}

deleteProduct();


// Passer la commande ( formulaire + regex + erreur ) . ---------------------------------------------------------------------------------------------------------------------------



// Renvoi vers confirmation.html + numéro de commande . ---------------------------------------------------------------------------------------------------------------------------



