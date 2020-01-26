var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: "./assets/vmSocks-green.png",
    inStock: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }
})
