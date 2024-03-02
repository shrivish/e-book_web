const galleryImages = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    }
];

const products = [
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
];

function celsiusToFar(temperature) {
    let fahr = (temperature * 9 / 5) + 32;
    return fahr;
}

// Menu Section
function menuHandler() {
    document.querySelector("button#open-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

    document.querySelector("#close-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

//Greeting Section
function greetingHandler() {
    let currentHour = new Date().getHours();
    let greetingText;
    if (currentHour < 12) {
        greetingText = "Good Morning!";
    } else if (currentHour < 19) {
        greetingText = "Good AfterNoon!";
    } else if (currentHour < 24) {
        greetingText = "Good Evening!";
    } else {
        greetingText = "Welcome!";
    }


    const weatherConditions = "sunny";
    const userlocation = "India";
    let temperature = 30;
    let celsiusText = `The weather is ${weatherConditions} in ${userlocation} and it's ${temperature.toFixed(1)}°C outside.`;
    let fahrText = `The weather is ${weatherConditions} in ${userlocation} and it's ${celsiusToFar(temperature).toFixed(1)}°C outside.`;

    document.querySelector("#greeting").innerHTML = greetingText;
    document.querySelector("p#weather").innerHTML = celsiusText;

    document.querySelector(".weather-group").addEventListener("click", function (e) {
        //celcius
        //fahr
        if (e.target.id == "celsius") {
            document.querySelector("p#weather").innerHTML = celsiusText;
        } else if (e.target.id == "fahr") {
            document.querySelector("p#weather").innerHTML = fahrText;
        }
    });
}

//Time Section
function clockHandler() {
    setInterval(function () {
        let local_time = new Date();
        document.querySelector("span[data-time=hours]").textContent = local_time.getHours().toString().padStart(2, "0");
        document.querySelector("span[data-time=minutes]").textContent = local_time.getMinutes().toString().padStart(2, "0");
        document.querySelector("span[data-time=seconds]").textContent = local_time.getSeconds().toString().padStart(2, "0");
    }, 1000);
}

//gallery handler
function galleryHandler() {
    let mainImage = document.querySelector("#gallery>img");
    let thumbnails = document.querySelector("#gallery .thumbnails");
    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;

    galleryImages.forEach(function (image, index) {
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        if (index === 0) {
            thumb.dataset.selected = true;
        }
        else {
            thumb.dataset.selected = false;
        }

        thumb.addEventListener("click", function (e) {
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImage = galleryImages[selectedIndex];
            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;

            thumbnails.querySelectorAll("img").forEach(function (img) {
                img.dataset.selected = false;
            });

            e.target.dataset.selected = true;
        });


        thumbnails.appendChild(thumb);
    });
}


//Product Section

function populateProducts(productList){
    let productsSection = document.querySelector(".products-area");
    productsSection.textContent = "";
    productList.forEach(function (product, index) {

        // create an HTML element for individual product
        let productElm = document.createElement("div");
        productElm.classList.add("product-item");

        // create the product image
        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = "Image for" + product.title;

        //create the product detail section
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        //create product title, author, and price
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;

        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;

        let priceTitle = document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.textContent = "Price";


        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";

        //add in the product detail section
        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(priceTitle);
        productDetails.append(productPrice);


        // Add all child elemnts to the product
        productElm.append(productImage);
        productElm.append(productDetails);

        productsSection.append(productElm);
    });
}
function productsHandler() {
   
    let freeProduct = products.filter(item => !item.price || item.price<=0);

    let paidProduct = products.filter(function(item){
        return item.price>0;
    });

    // console.log("free:",freeProduct);
    // console.log("paid:",paidProduct);

    //array filter method
    populateProducts(products);
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProduct.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProduct.length;

    let productFilter = document.querySelector(".products-filter");
    productFilter.addEventListener("click",function(e){
        if(e.target.id==="all"){
            populateProducts(products);
        }
        else if(e.target.id==="paid"){
            populateProducts(paidProduct);
        }
        else if(e.target.id==="free"){
            populateProducts(freeProduct);
        }
    });

}

//footer section
function footerHandler(){
    let currentyear = new Date().getFullYear();
    document.querySelector("footer").textContent = `${currentyear}- All rights reserved.`;
}

navigator.geolocation.getCurrentPosition(position =>{
    fetch();
})
// Page load
menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();
