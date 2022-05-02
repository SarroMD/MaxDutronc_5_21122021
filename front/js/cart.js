// Récapitulatif des articles du panier . ---------------------------------------------------------------------------------------------------------------------------------------------

//Initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produits"));

const ifEmptyCart = document.querySelector("#cart__items");

// Création des fonctions de la page panier . -----------------------------------------------------------------------------------------------------------------------------------------

// Si le panier est vide
function getCart(){

if (!localStorage.getItem("produits") || produitLocalStorage == 0) {
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

function getTotals(){

    // Récupération du total des quantités -------------------------------------------------------------------------------------------------------------------------------------------

    var itemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = itemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += parseInt(itemsQtt[i].value);
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;

    // Récupération du prix total ----------------------------------------------------------------------------------------------------------------------------------------------------

    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (itemsQtt[i].value * produitLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
}

// Modification d'éléments du panier . -----------------------------------------------------------------------------------------------------------------------------------------------

function modifyCart() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let j = 0; j < qttModif.length; j++){
        qttModif[j].addEventListener("change" , (event) => {
            event.preventDefault();

            let modifQuantite = produitLocalStorage[j].quantiteProduit;
            let qttModifValue = qttModif[j].valueAsNumber;
            let idModify = produitLocalStorage[j].idProduit;
            let colorModify = produitLocalStorage[j].couleurProduit;
            
            const resultFind = produitLocalStorage.find( el => el.qttModifValue !== modifQuantite && el.idProduit === idModify && el.couleurProduit === colorModify );

            resultFind.quantiteProduit = qttModifValue;
            produitLocalStorage[j].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produits", JSON.stringify(produitLocalStorage));
        
            // refresh rapide
            location.reload();
        })
    }
}

// Suppression d'éléments du panier . ------------------------------------------------------------------------------------------------------------------------------------------------

function deleteProduct() {

    let btn_supprimer = document.querySelectorAll(".deleteItem");

            for (let k = 0; k < btn_supprimer.length; k++){
                btn_supprimer[k].addEventListener("click" , (event) => {
                    event.preventDefault();

                    let idDelete = produitLocalStorage[k].idProduit;
                    let colorDelete = produitLocalStorage[k].couleurProduit;
                    
                    produitLocalStorage = produitLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            
                    localStorage.setItem("produits", JSON.stringify(produitLocalStorage));

                    //Alerte produit supprimé et refresh
                    alert("Ce produit a bien été supprimé du panier");
                    location.reload();

                })         
            }
} 

// Passer la commande ( formulaire + regex + erreur ) . ------------------------------------------------------------------------------------------------------------------------------

// Formulaire avec regex .

function getForm(){

    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let nameCityRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    var firstName = form.firstName.value;
    var lastName = form.lastName.value;
    var adress = form.address.value;
    var city = form.city.value;
    var email = form.email.value;

    if (nameCityRegExp.test(firstName)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        return false;
    }

    if (nameCityRegExp.test(lastName)) {
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        return false;
    }

    if (addressRegExp.test(adress)) {
        addressErrorMsg.innerHTML = '';
    } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        return false;
    }

    if (nameCityRegExp.test(city)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        return false;
    }

    if (emailRegExp.test(email)) {
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        return false;
    }

        return true;
}

function postForm(event){ 
    event.preventDefault();

    // Ecouter le panier
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        if (getForm()) {

        if (produitLocalStorage === null) {
            alert("Votre panier est vide.");
            return false;
        }

        //Construction d'un array depuis le local storage
        let products = [];
        for (let i = 0; i<produitLocalStorage.length;i++) {
            products.push(produitLocalStorage[i].idProduit);
        }

        let contact = {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
        };

        const order = {
            contact,
            products,
        }; 

            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            .then(function(res) {
                if (res.ok) {
                    return res.json();
                    console.log(res);
                } 
            })
            .then(function(value) {
                console.log(value.orderId);

                localStorage.clear();             
                document.location.href = "confirmation.html?orderId=" + value.orderId;

            });
        }
}

// Récupération de l'Url -------------------------------------------------------------------------------------------------------------------------------------------------------------
var str = window.location.href;
const url = new URL(str);
const commandeId = url.searchParams.get("orderId");

// Récupération du bouton Commander .
const btn_commander = document.querySelector("#order");

// Affichage de l'orderId si existant (confirmation.html), sinon appel des fonctions pour le panier (cart.html) . --------------------------------------------------------------------
let order = document.getElementById("orderId");
    if (commandeId !== null){
        order.innerHTML = commandeId;
    } else {
                getCart();
                getTotals();
                modifyCart();
                deleteProduct(); 


                btn_commander.addEventListener("click", postForm, false);
    }