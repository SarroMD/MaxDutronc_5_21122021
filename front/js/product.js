// Récupération de l'ID produit dans l'URL .

var str = window.location.href;

const url = new URL(str);

const productId = url.searchParams.get("id");
console.log(productId);

// Appel de la fonction productArticle .

productArticle();

// Récupérations des données de l'API .

function productArticle() {
    fetch("http://localhost:3000/api/products/" + productId)
        .then(function(res) {
            if (res.ok) {
            return res.json();
            }
        
        })

        // Répartitions des données dans le DOM .
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

function insertProduct(article) {

    // Affichage de l'image .
    let productImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImage);
    productImage.src = article.imageUrl;
    productImage.alt = article.altTxt;

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
    

}