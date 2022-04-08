// Récapitulatif des articles du panier . ---------------------------------------------------------------------------------------------------------------------------------------------

//Initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produits"));
console.table(produitLocalStorage);

const ifEmptyCart = document.querySelector("#cart__items");

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

// modifyCart();


// Suppression d'éléments du panier . ---------------------------------------------------------------------------------------------------------------------------------------------

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

// deleteProduct(); 

// Passer la commande ( formulaire + regex + erreur ) . ---------------------------------------------------------------------------------------------------------------------------

// Formulaire avec regex .

function getForm() {

    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let nameCityRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (nameCityRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (nameCityRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (nameCityRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }

getForm();

//Envoi des informations client au localstorage

const btn_commander = document.querySelector("#order");
btn_commander.addEventListener("click", postForm, false);

function postForm(event){
    event.preventDefault();
    // const btn_commander = document.getElementById("order");

    // Ecouter le panier

    // btn_commander.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i<produitLocalStorage.length;i++) {
            idProducts.push(produitLocalStorage[i].idProduit);
        }
        console.log(idProducts);

        let contact = {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
        };

        const order = {
            contact,
            idProducts,
        }; 

console.log(order);
console.log("***");


            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            .then(function(res) {
                console.log(res);
                return res.json();
              /*  if (res.ok) {
                    return res.json();
                    console.log(res);
                } */
            })
            .then(function(value) {
                console.log(value);

              /*  document.getElementById("orderId")
                document.innerHTML = value.data.orderId;

                document.location.href = "confirmation.html";

                localStorage.clear();
                localStorage.setItem("orderId", data.orderId); */
            });
      //  }) 
}

// postForm();

// Renvoi vers confirmation.html + numéro de commande . ---------------------------------------------------------------------------------------------------------------------------



