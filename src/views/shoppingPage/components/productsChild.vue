<template>
<div id="box">
  <p id="top">Market</p>
  <a href="/cart"><b-img :src="require(`../../../assets/cart.png`)" style="max-width: 40px"> </b-img></a>
  <b-container>
  <b-card v-for="(product, index) in productData" v-bind:key="index" id="card">
  <b-img :src="'http://localhost:3000/'+product.path" class="profile-img" @click="detailProduct(product.path)" style="max-width: 200px"></b-img>
  <b-card-text>Product name: {{product.name}}</b-card-text>
  <b-card-text>Unit price: {{product.price}}</b-card-text>
  <b-card-text>Available amount: {{product.amount}}</b-card-text>
  </b-card>
  </b-container>
  <b-pagination align="center"
    v-model="currentPage"
    :total-rows="rows"
    :per-page="10"
    @click.native="changePage(currentPage)"
  >

  </b-pagination>

</div>
</template>


<script>

const url = '/admin/products';

export default {

  data() {
    return{
      productData:[],
      currentPage:1,
      pageData:[],
    }

  },


  mounted() {
    this.getData()
  },

  methods:{
    detailProduct(path){
      this.$router.push({
        path:'/shopping/:id',
        query:{
          id:path
        }
      })

    },
    async changePage(currentPage) {
      const newUrl = `/shopping/page?page=${currentPage}`
      await this.$axios.get(newUrl).then(res=>{
        this.productData = res.data
      })
    },
    goCart() {
      this.router.push('/cart')
    },
    async getData() {
      await this.$axios.get(url).then(res=>{
        this.pageData = res.data
        let arrayLength
        if(this.pageData.length < 10){
          arrayLength = this.pageData.length
        } else {
          arrayLength = 10
        }
        for (let i = 0; i < arrayLength; i++){
          this.productData[i] = this.pageData[i]
        }
      })
    }

  },
  computed:{
    rows() {
      return this.pageData.length
    }
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
  width: 1000px;
}
#card{
  background-color: #FFEAA7;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
}

</style>
