var eventBus = new Vue()

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
            <div class="product-image">
                <img v-bind:src="image">
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p>{{ description }}</p>
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else>Sold out</p>
                <p>Shipping: {{ shipping }}</p>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <div v-for="(variant, index) in variants" 
                :key="variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
                    </div>

                <button v-on:click="addtoCart"
                        :disabled="inventory==0"
                        :class="{ disabledButton: inventory==0 }"
                >Add to Cart</button>
                
            </div>
            <product-tabs :doctores="doctores"></product-tabs>
            <ebais></ebais>
            
        </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            description: 'A pair of warm, fuzzy socks',
            selectedVariant: 0,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 1234,
                    variantColor: 'green',
                    variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
                    variantQuantity: 30
                },
                {
                    variantId: 4321,
                    variantColor: 'blue',
                    variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0
                }
            ],
            reviews: []
        }

    },
    methods: {
        addtoCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function (index) {
            this.selectedVariant = index,
                console.log(index)
        }
        // addReview: function (productReview) {
        //     this.reviews.push(productReview)
        // }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inventory() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }

    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-tabs', {
    template: `
    <div>
        <span :class="{ activeTab: selectedTab === tab }"
        class="tab" v-for="(tab, index) in tabs" :key="index"
        @click="selectedTab = tab">{{ tab }}</span>
        <div v-show= "selectedTab === 'Doctores'">
            <br>
            <product-subtabs></product-subtabs>
        </div>

        <div v-show= "selectedTab === 'Ebais'">
            <br>//Submenu2
        <ebais></ebais>
        </div>

        <div v-show= "selectedTab === 'Usuarios'">
            <br>//Submenu3
        </div>

        <div v-show= "selectedTab === 'Citas'">
            <br>//Submenu4
        </div>
    </div>
    `,
    data() {
        return {
            tabs: ['Doctores', 'Ebais', 'Usuarios', 'Citas'],
            selectedTab: 'Doctores'
            // selectedTab0: false
        }
    }
})

Vue.component('product-subtabs', {
    template: `
    <div>
        <span :class="{ activeTab: selectedTab === tab }"
        class="tab" v-for="(tab, index) in tabs" :key="index"
        @click="selectedTab = tab">{{ tab }}</span>
        <div v-show= "selectedTab === 'Registrar'">
            <br>//Submenu1
        </div>

        <div v-show= "selectedTab === 'Actualizar'">
            <br>//Submenu2
        <ebais></ebais>
        </div>

        <div v-show= "selectedTab === 'Eliminar'">
            <br>//Submenu3
        </div>

        <div v-show= "selectedTab === 'Mostrar'">
            <br>//Submenu4
        </div>
    </div>
    `,
    data() {
        return {
            tabs: ['Registrar', 'Actualizar', 'Eliminar', 'Mostrar'],
            selectedTab: 'Registrar',
            selectedTabFather: ''
        }
    }
})

Vue.component('ebais', {
    template: `
    <form class="review-form" @submit.prevent="registrar">

      <p>
        <label for="telefono">Telefono:</label>
        <input id="telefono" v-model="telefono" placeholder="telefono">
      </p>

      <p>
        <label for="provincia">Provincia:</label>
        <input id="provincia" v-model="provincia" placeholder="provincia">
      </p>

      <p>
        <label for="canton">Canton:</label>
        <input id="canton" v-model="canton" placeholder="canton">
      </p>

      <p>
        <label for="distrito">Distrito:</label>
        <input id="distrito" v-model="distrito" placeholder="distrito">
      </p>

      <input type="submit" value="Submit">
      </form>

    
    `,
    data() {
        return {
            telefono: 0,
            provincia: '',
            canton: '',
            distrito: '',
            ebaiss: []
        }
    },
    methods: {
        actualizar: function (telefono, provincia, canton, distrito) {
            this.telefono = telefono,
                this.provincia = provincia,
                this.canton = canton,
                this.distrito = distrito
        },
        registrar: function (telefono, provincia, canton, distrito) {
            this.telefono = telefono,
                this.provincia = provincia,
                this.canton = canton,
                this.distrito = distrito
        },
        eliminar: function (telefono) {
            this.telefono = telefono
        },
        obtener: function () {
            //Llamada a la función get 
            // Aquí debe ir la obtención de todos los ebais
        },
        obtener1: function (telefono) {
            this.telefono = telefono
        }

    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length >0">
        <b>Please correct the following error(s):</b>
        <ul>
        <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit: function () {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview),
                    this.name = null,
                    this.review = null,
                    this.rating = null
            } else {
                if (!this.name) this.errors.push("Name required")
                if (!this.review) this.errors.push("Review required")
                if (!this.rating) this.errors.push("Rating required")
            }
        }
    }
})

var app = new Vue({
    el: "#app",
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
    // data: {
    //     brand: 'Vue Mastery',
    //     product: 'Socks',
    //     description: 'A pair of warm, fuzzy socks',
    //     selectedVariant: 0,
    //     details: ['80% cotton','20% polyester', 'Gender-neutral'],
    //     variants:[
    //         {
    //             variantId: 1234,
    //             variantColor: 'green',
    //             variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
    //             variantQuantity: 30
    //         },
    //         {
    //             variantId: 4321,
    //             variantColor: 'blue',
    //             variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
    //             variantQuantity: 0
    //         }
    //     ],
    //     cart: 0
    // },
    // methods: {
    //     addtoCart: function (){
    //         this.cart += 1
    //     },
    //     updateProduct: function (index){
    //         this.selectedVariant = index,
    //         console.log(index)
    //     }
    // },
    // computed: {
    //     title(){
    //         return this.brand + ' ' + this.product
    //     },
    //     image(){
    //         return this.variants[this.selectedVariant].variantImage
    //     },
    //     inventory(){
    //         return this.variants[this.selectedVariant].variantQuantity
    //     }
    // }
})