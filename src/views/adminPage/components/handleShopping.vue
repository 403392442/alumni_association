<template>
  <div id="box" v-show="isReady">
    <div>
      <b-form @submit.prevent="addProductFunction">
        <h4>Add product</h4>
        <div v-show="isShowAdd">
          <b-form-group label-cols="4" label-cols-lg="2" label="Product name:">
            <b-form-input v-model="addProduct.name" type="text" v-on:blur="checkName" required placeholder="Enter product name"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Product price:">
            <b-form-input v-model="addProduct.price" type="number" required placeholder="Enter product price"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Product size:">
            <b-form-input v-model="addProduct.size" type="text" required placeholder="Enter product size"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Product amount:">
            <b-form-input v-model="addProduct.amount" type="number" required placeholder="Enter product amount"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Product description:">
            <b-form-textarea rows="3" v-model="addProduct.description" type="text" required placeholder="Enter product description"></b-form-textarea>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Product category:">
            <b-form-input v-model="addProduct.category" type="text" required placeholder="Enter product category"></b-form-input>
          </b-form-group>
          <b-button class="button" type="submit">Next</b-button>
        </div>
      </b-form>
      <hr>
    </div>

    <div v-show="isShowCrop">
      <div size="120" class="user" style="margin: 0 auto">
        <b-icon class="icon primary white--text" @click="$refs.FileInput.click()">add picture</b-icon>
        <input ref="FileInput" type="file" style="display: none;" @change="onFileSelect" />
      </div>
      <b-container v-model="dialog" width="500">
        <b-card>
          <b-card-text>
            <VueCropper v-show="selectedFile" ref="cropper" :src="selectedFile" alt="Source Image"></VueCropper>
          </b-card-text>
          <b-card>
            <b-btn class="primary button" @click="savePhoto() (dialog = false)">Crop</b-btn>
          </b-card>
        </b-card>
      </b-container>
      <hr>
    </div>

    <div>
      <h4>Find product</h4>
      <b-form @submit.prevent="findProductFunction">
        <b-form-group label-cols="4" label-cols-lg="2" label="Product name:">
          <b-form-input v-model="findProduct.name" type="text" required placeholder="Enter product name"></b-form-input>
        </b-form-group>
        <b-button class="button" type="submit">Search</b-button>
      </b-form>

      <div v-show="showChange[10]">
        <ul>
          <li>Name: <b>{{findProduct.name}}</b></li>
          <li>Price: <b>{{findProduct.price}}</b></li>
          <li>Amount: <b>{{findProduct.amount}}</b></li>
          <button class="deleteButton" @click.prevent="deleteProductFunction(findProduct.name)">delete</button>
          <button class="changeButton" @click="isShowResult = !isShowResult">change</button>
        </ul>
        <b-form v-show="isShowResult" @submit.prevent="submitChange">
          <b-form-group label-cols="4" label-cols-lg="2" label="Product name:">
            <b-form-input v-model="findProduct.name" type="text" required></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Product price:">
            <b-form-input v-model="findProduct.price" type="number" required></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Product size:">
            <b-form-input v-model="findProduct.size" type="text" required></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Product amount:">
            <b-form-input v-model="findProduct.amount" type="number" required></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Product description:">
            <b-form-textarea rows="3" v-model="findProduct.description" type="text" required></b-form-textarea>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Product category:">
            <b-form-input v-model="findProduct.category" type="text" required></b-form-input>
          </b-form-group>
          <b-button class="button" type="submit">submit</b-button>
        </b-form>
      </div>
      <hr>
      <div>
        <h4>Products list</h4>
        <ul>
          <li v-for="(product, index) in productData" :key="index">
            <p>Name: <b>{{product.name}}</b></p>
            <p>Price: <b>{{product.price}}</b></p>
            <p>Amount: <b>{{product.amount}}</b></p>
            <button class="deleteButton" @click.prevent="deleteProductFunction(product.name)">delete</button>
            <button class="changeButton" @click.prevent="clickChangeProduct(index, product.name, product.price, product.size, product.amount, product.description, product.category, product.path)">change</button>
            <b-form @submit.prevent="submitChange" v-show="showChange[index]">
              <b-form-group label-cols="4" label-cols-lg="2" label="Product name:">
                <b-form-input v-model="findProduct.name" type="text" required></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="2" label="Product price:">
                <b-form-input v-model="findProduct.price" type="number" required></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="2" label="Product size:">
                <b-form-input v-model="findProduct.size" type="text" required></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="2" label="Product amount:">
                <b-form-input v-model="findProduct.amount" type="number" required></b-form-input>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="2" label="Product description:">
                <b-form-textarea rows="3" v-model="findProduct.description" type="text" required></b-form-textarea>
              </b-form-group>
              <b-form-group label-cols="4" label-cols-lg="2" label="Product category:">
                <b-form-input v-model="findProduct.category" type="text" required></b-form-input>
              </b-form-group>
              <b-button class="button" type="submit">submit</b-button>
            </b-form>
            <hr>
          </li>
          <b-pagination
              align="center"
              v-model="currentPage"
              :total-rows="rows"
              :per-page="10"
              @click.native="changePage(currentPage)"
          ></b-pagination>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs"
import 'cropperjs/dist/cropper.css'


export default {
  components: { VueCropper },
  props: ['image_name'],
  data() {
    return{
      mime_type: '',
      cropedImage: '',
      autoCrop: false,
      selectedFile: '',
      image: '',
      dialog: false,
      files: '',

      isReady: false,
      isShowAdd: true,
      isShowCrop: false,
      isShowFind: false,
      isShowResult: false,
      showFindChange: false,
      currentPage: 1,

      showChange: [false, false, false, false, false, false, false, false, false, false, false],
      searchProduct: '',
      productData:[],
      pageData:[],

      addProduct: {
        name: '',
        price: '',
        size: '',
        amount: '',
        description: '',
        category: '',
        path: '',
      },

      findProduct: {
        name: '',
        price: '',
        size: '',
        amount: '',
        description: '',
        category: '',
        path: '',
      }
    }
  },

  methods: {
    async checkName() {
      await this.$axios.get(`/admin/findProduct?name=${this.addProduct.name}`).then(res=>{
        console.log(res.data)
        if (res.data === 'exist'){
          alert("Product already exist")
          this.addProduct.name = ''
          this.addProduct.price = ''
          this.addProduct.size = ''
          this.addProduct.amount = ''
          this.addProduct.description = ''
          this.addProduct.category = ''
          this.addProduct.path = ''
        }
      })
    },

    async addProductFunction() {
      await this.$axios.post('/admin/addProduct', this.addProduct).then(res=>{
        console.log(res.data)
        alert("Please add picture")
        this.isShowAdd = false
        this.isShowCrop = true
      })
    },

    savePhoto() {
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('product_photo', blob, 'name.jpeg')
        formData.append('name', this.addProduct.name)
        alert('success')
        this.$axios.post('/admin/addPhoto', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res=>{
          console.log(res.data)
          this.$router.go(0)
        })}, this.mime_type)
    },

    onFileSelect(e) {
      const file = e.target.files[0]
      this.mime_type = file.type
      console.log(this.mime_type)
      if (typeof FileReader === 'function') {
        this.dialog = true
        const reader = new FileReader()
        reader.onload = (event) => {
          this.selectedFile = event.target.result
          this.$refs.cropper.replace(this.selectedFile)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },

    async findProductFunction(){
      const url = `/admin/findProduct?name=${this.findProduct.name}`
      await this.$axios.get(url).then(res=>{
        if (res.data === 'not exist'){
          alert("product not exist")
        } else {
          console.log(res.data)
          this.findProduct.name = res.data.name
          this.findProduct.price = res.data.price
          this.findProduct.size = res.data.size
          this.findProduct.amount = res.data.amount
          this.findProduct.description = res.data.description
          this.findProduct.category = res.data.category
          this.findProduct.path = res.data.path
          for (let i = 0; i < 11; i++){
            this.$set(this.showChange, i, false)
          }
          this.$set(this.showChange, 10, true)
          this.isShowResult = false
        }
      })
    },

    async deleteProductFunction(name) {
      let answer = window.confirm("Are you sure?")
      if (answer){
        await this.$axios.post('/admin/deleteProduct', {name: name}).then(res=>{
          console.log(res.data)
          this.$router.go(0)
        })
      }
    },

    async submitChange() {
      await this.$axios.post('/admin/changeProduct', this.findProduct).then(res=>{
        console.log(res.data)
        this.$router.go(0)
      })
    },

    async getData() {
      await this.$axios.get('/admin/products').then(res=>{
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
        this.isReady = true
      })
    },

    clickChangeProduct(index, name, price, size, amount, description, category, path) {
      for (let i = 0; i < 11; i++){
        this.$set(this.showChange, i, false)
      }
      this.$set(this.showChange, index, !this.showChange[index])
      this.findProduct.name = name
      this.findProduct.price = price
      this.findProduct.size = size
      this.findProduct.amount = amount
      this.findProduct.description = description
      this.findProduct.category = category
      this.findProduct.path = path
      this.showFindChange = false
    },

    async changePage(currentPage) {
      const newUrl = `/resources/career/page?page=${currentPage}`
      await this.$axios.get(newUrl).then(res=>{
        this.productData = res.data
        for (let i = 0; i < 11; i++){
          this.$set(this.showChange, i, false)
        }
        this.showFindChange = false
        this.findProduct.name = ''
        this.findProduct.price = ''
        this.findProduct.size = ''
        this.findProduct.amount = ''
        this.findProduct.description = ''
        this.findProduct.category = ''

      })
    },




  },

  mounted() {
    this.getData()
  },

  computed:{
    rows() {
      return this.pageData.length
    }
  },
}
</script>

<style scoped>
#box{
  padding: 20px;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  margin: 20px auto;
}
.icon{
  background-color: #800001;
  color: white;
  font-size: 20px;
  border: 1px solid #800001;
  border-radius: 5px;
}
h4{
  color: #800001;
}
hr{
  height: 1px;
  background-color: #800001;
  color: #800001;
}
.button{
  background-color: #800001;
}
.deleteButton{
  background-color: #CEC094;
  color: #800001;
}
.changeButton{
  background-color: #CEC094;
  color: #800001;
  margin-left: 10px;
}
ul{
  list-style: none;
}

</style>
