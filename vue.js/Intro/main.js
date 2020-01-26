var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    brand: "Vue Mastery",
    selectedIndex: 0,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        id: 2234,
        color: "green",
        image: "./assets/vmSocks-green.png",
        quantity: 10
      }, {
        id: 2235,
        color: "blue",
        image: "./assets/vmSocks-blue.png",
        quantity: 1
      }
    ],
    cart: 0,
    onSale: true
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedIndex].image;
    },
    inStock() {
      return this.variants[this.selectedIndex].quantity;
    },
    sale() {
      if (this.onSale) return `${this.title} are on sale!`
      return `${this.title} are not on sale.`
    }
  },
  methods: {
    addToCart: function() {
      if (this.cart < this.inStock) this.cart += 1;
    },
    removeFromCart() {
      if (0 < this.cart) this.cart -= 1;
    },
    updateProduct(index) {
      this.selectedIndex = index;
    }
  }
})
