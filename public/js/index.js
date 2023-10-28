(function () {
  const socket = io();

  const realTimeProducts = document.getElementById("realTimeProducts");

  function updateListProducts(products) {
    realTimeProducts.innerText = "";
    products.forEach((product) => {
      const prod = document.createElement("article");

      prod.innerHTML = `<h4>${product.title}</h4>
      <p>ID: ${product.id}</p>
      <p>Descripción: ${product.description}</p>
      <p>Código: ${product.code}</p>
      <p>Precio: ${product.price}</p>
      <p>Estado: ${product.status}</p>
      <p>Stock: ${product.stock}</p>
      <p>Categoría: ${product.category}</p>
      <p>Imágenes: ${product.thumbnail}</p>`;

      realTimeProducts.appendChild(prod);
      console.log("hola");
    });
  }

  socket.on("prueba", () => {
    console.log("Hola");
  });
  socket.on("listProducts", (products) => {
    updateListProducts(products);
  });

  document
    .getElementById("addProductForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const newProduct = {
        id: null,
        title: document.getElementById("productTitle").value,
        description: document.getElementById("productDescription").value,
        code: document.getElementById("productCode").value,
        price: document.getElementById("productPrice").value,
        status: true,
        stock: document.getElementById("productStock").value,
        category: document.getElementById("productCategory").value,
        thumbnail: [],
      };

      socket.emit("addProduct", newProduct);
    });
})();
