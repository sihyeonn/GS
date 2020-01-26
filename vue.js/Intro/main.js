var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: "./assets/vmSocks-green.png",
    inStock: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        id: 2234,
        color: "green",
        image: "./assets/vmSocks-green.png"
      }, {
        id: 2235,
        color: "blue",
        image: "./assets/vmSocks-blue.png"
      }
    ],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    removeFromCart() {
      if (0 < this.cart) this.cart -= 1;
    },
    updateProduct(image) {
      this.image = image;
    }
  }
})
