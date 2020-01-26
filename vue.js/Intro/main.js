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

      <div>
        <h2>Reviews</h2>
        <ul v-if="reviews.length">
          <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.content }}</p>
          <p>Recommendation: {{ review.recommend }}</p>
          </li>
        </ul>
        <p v-else>There are no reviews yet.</p>
      </div>
      <productReview @review-submitted="addReview"></productReview>
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
      onSale: true,
      reviews: []
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
    },
    addReview(review) {
      this.reviews.push(review);
      console.log(this.reviews);
    }
  }
});

Vue.component('productReview', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <p>
        <label for="name">Name:</label>
        <input id="name"
               v-model="review.name"
               placeholder="Name"
               required
               >
        </input>
      </p>
      <p>
        <label for="content">Content:</label>
        <textarea id="content"
               v-model="review.content"
               placeholder="Review"
               required
               >
        </textarea>
      </p>
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="review.rating">
          <option v-for="i in 5" >{{ i }}</option>
        </select>
      </p>
      <p>Would you recommend this product?</p>
      <label>Absolutely
        <input type="checkbox" value="Recommend" v-model="review.recommend" required />
      </label>
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  data() {
    return { review: { recommend: true }, errors: [] }; 
  },
  methods: {
    errorCheck() {
      this.errors = [];
      if (!this.review.rating) this.errors.push("Rating Required.");
    },
    onSubmit() {
      this.errorCheck();
      if (!this.errors.length) {
        this.$emit('review-submitted', this.review);
        this.review = { recommend: true };
      }
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
