// Récupération de l'ID produit dans l'URL .

var str = window.location.href;

const url = new URL(str);

const productId = url.searchParams.get("id");

// Appel de la fonction productArticle / addToCart et création des constantes couleur et quantité .

const couleur = document.querySelector("#colors");
const quantite = document.querySelector("#quantity");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
let imgSrc = document.querySelectorAll(".item__img");
let imgAlt = document.querySelectorAll(".item__img");
const description = document.querySelector("#description");

productArticle();

const sendCartButton = document.querySelector("#addToCart");
sendCartButton.addEventListener("click", addToCart, false);


// Récupérations des données de l'API en fonction de l'ID du produit dans l'URL .
function productArticle() {
    fetch("http://localhost:3000/api/products/" + productId)
        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        
        })

        .then(async function(resAPI) {
            let article = await resAPI;
            if (article) {
                insertProduct(article);
            }
        })

        .catch(function(error) {
            console.log("Erreur API");
        })
}

// Répartition des données de l'API dans le DOM .
function insertProduct(article) {

    // Affichage de l'image .
    let productImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImage);
    productImage.src = article.imageUrl;
    productImage.alt = article.altTxt;

    imgSrc = article.imageUrl;
    imgAlt = article.altTxt;

    // Ajout du titre .
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Ajout du prix .
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Ajout de la description .
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Ajout des choix de couleurs .
    for (let colors of article.colors) {
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.innerHTML = colors;
    }

}

// Fonction qui permet l'ajout au panier du ou des produits choisis par l'utilisateur .
function addToCart() {
    if (quantite.value > 0 && quantite.value <= 100) {

        // Valeur de la couleur choisie .
        let choixCouleur = couleur.value;

        // Valeur de la quantitée choisie .
        let choixQuantite = quantite.value;

        // Objet des options de l'article .
        let optionsProduit = {
            idProduit : productId,
            couleurProduit : choixCouleur,
            quantiteProduit : choixQuantite,
            nomProduit : title.innerHTML,
            prixProduit : price.innerHTML,
            descriptionProduit : description.innerHTML,
            imageProduit : imgSrc,
            altImageProduit : imgAlt,
        };

        let produitLocalStorage =[];

        if ( !localStorage.getItem("produits")) {

            produitLocalStorage.push(optionsProduit);
            
        } else {

            produitLocalStorage = JSON.parse(localStorage.getItem("produits"));

            if (Array.isArray(produitLocalStorage)) {

                let produitExist = false;

                for (let i in produitLocalStorage) {
                    if (produitLocalStorage[i].idProduit === productId && produitLocalStorage[i].couleurProduit === choixCouleur) {
                        produitLocalStorage[i].quantiteProduit = parseInt(produitLocalStorage[i].quantiteProduit) + parseInt(choixQuantite);
                        produitExist = true;
                    }
                }

                if (!produitExist) {
                    produitLocalStorage.push(optionsProduit);
                }
            }
        }

            localStorage.setItem("produits", JSON.stringify(produitLocalStorage));

                let confirmAction = confirm('Votre commande de '+choixQuantite+' '+title.innerHTML+' '+choixCouleur+' est ajoutée au panier, Souhaitez vous être redirigé vers le panier ? ');
                if (confirmAction) {
                    window.location.href ="cart.html";    
                }


    } else {

        alert('Veuillez choisir une couleur et une quantitée de produit entre 1 et 100.');

    }

}


