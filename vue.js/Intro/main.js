Vue.component('productDetails', {
  props: {
    details: {
      type: Array,
      required: false,
      default: []
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  template: `
    <div class="product">

      <div class="product-image">
        <img v-bind:src="image" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
        <p>{{ sale }}</p>
        <p>Shipping: {{ shippingCost }}</p>

        <productDetails :details="details"></productDetails>

        <div v-for="(variant, index) in variants"
             class="color-box"
             v-bind:key="variant.id"
             :style="{ backgroundColor: variant.color }"
             @mouseover="updateProduct(index)"
             >
        </div>

        <div class="cart">
          <p>Cart({{ cart }})</p>
        </div>

        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
                >
                Add to Cart
        </button>

        <button @click="removeFromCart"
                :disabled="!cart"
                :class="{ disabledButton: !cart }"
                >
                Remove From Cart
        </button>
      </div>
    </div>
  `,
  data() {
    return {
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
    };
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
    },
    shippingCost() {
      return this.premium ? "Free" : 2.99.toString();
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
});

var app = new Vue({el: '#app'})
