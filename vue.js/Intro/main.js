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
    },
    id: {
      type: Number,
      required: true
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


        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
                >
                Add to Cart
        </button>

        <button @click="removeFromCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
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
      this.$emit('add-to-cart', this.id, this.selectedIndex);
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.id, this.selectedIndex);
    },
    updateProduct(index) {
      this.selectedIndex = index;
    }
  }
});

var app = new Vue({
  el: '#app',
  data: { cart: [] },
  computed: {
    totalCart() {
      if (this.cart.length)
        return this.cart.reduce((sum, i) => sum += i.count, 0).toString();
      return '0';
    }
  },
  methods: {
    getIndexOfItem(id, index) {
      return this.cart.findIndex(({ product_id, option }) => product_id === id && option === index);
    },
    addToCart(id, index) {
      let itemIndex = this.getIndexOfItem(id, index);
      if (-1 < itemIndex) this.cart[itemIndex].count += 1;
      else
        this.cart.push({product_id: id, option: index, count: 1});
    },
    removeFromCart(id, index) {
      let itemIndex = this.getIndexOfItem(id, index);
      if (-1 < itemIndex) {
        if (this.cart[itemIndex].count === 1)
          this.cart.splice(itemIndex, 1);
        else
          this.cart[itemIndex].count -= 1;
      }
    }
  }
})
