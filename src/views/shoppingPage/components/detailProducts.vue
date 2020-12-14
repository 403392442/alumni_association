<template>
  <div id="box">
    <p id="top">{{product.name}}</p>
    <b-card id="card">
      <b-img :src="'http://localhost:3000/'+product.path" class="profile-img" style="max-width: 200px"></b-img>
      <b-card-text class="description"><strong>{{product.description}}</strong></b-card-text>
      <b-card-text>Unit price: {{product.price}}</b-card-text>
      <b-card-text>Size: {{product.size}}</b-card-text>
      <b-card-text>Available amount: {{product.amount}}</b-card-text>
    </b-card>
    <b-form @submit.prevent="onSubmit">
    <b-form-group label-cols="4" label-cols-lg="2" label="Choose amount:">
      <b-form-input id="amount" v-model="form.amount" type="number" min="1" :max="this.form.maxAmount" placeholder="Enter how many do you want?"
                    required></b-form-input>
    </b-form-group>
    <b-button id="button" variant="primary" type="submit">Add to cart</b-button>
    </b-form>
  </div>

</template>

<script>

export default {
  data(){
    return{
      product:[],
      form:{
        amount:'',
        item:'',
        path:'',
        email:'',
        price:'',
        maxAmount:''
      }
    }
  },

  mounted() {
    this.getData()
  },

  methods:{
    async getData() {
      const newUrl = `/shopping/detail?id=${this.$route.query.id}`
      console.log(this.$route.query.id)
      console.log(newUrl)
      await this.$axios.get(newUrl).then(res=> {
        this.product = res.data
        this.form.item = res.data.name
        this.form.path = res.data.path
        this.form.email = this.$cookies.get('email')
        this.form.price = res.data.price
        this.form.maxAmount = res.data.amount
      })
    },
    async onSubmit() {
      console.log(this.form)
      await this.$axios.post('/cart/addToCart', this.form).then(res=>{
        alert(res.data)
      }).catch(function (err){
        alert(err)
      })
    },
  }

}
</script>

<style scoped>
#top{
  text-align: center;
  color: white;
  background-color: #800001;
  margin-bottom: 30px;
  font-size: 25px;
}
#box{
  padding: 20px;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  margin: 20px auto;
  display: table;
  width: 1200px;
  text-align: center;
}
#card{
  background-color: #FFEAA7;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
}
#button{
  background-color: #800001;
}
.description{
  font-size: 18px;
}

</style>
