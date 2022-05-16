indexProducts();

// Récupération des articles de l'API
async function getArticles() {
    var articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}

// Répartition des données de l'API dans le DOM
async function indexProducts() {
    var resultat = await getArticles ()
    .then(function (resAPI){
        const articles = resAPI;
        for (let article in articles) {

            // Insertion de "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${articles[article]._id}`;

            // Insertion de "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = articles[article].imageUrl;
            productImg.alt = articles[article].altTxt;

            // Insertion du titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = articles[article].name;

            // Insertion de la description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = articles[article].description;
        }
    })
    .catch (function(error){
        return error;
    });
}