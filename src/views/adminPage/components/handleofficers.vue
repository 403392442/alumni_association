<template>
  <div id="box">
    <div>
      <b-form @submit.prevent="addOfficerFunction">
        <h4>Add officer</h4>
        <div v-show="isShowAdd">
          <b-form-group label-cols="4" label-cols-lg="2" label="Officer Name:">
            <b-form-input v-model="addOfficer.name" type="text" v-on:blur="checkName" required placeholder="Enter officer name"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Phone Number:">
            <b-form-input v-model="addOfficer.phone" type="number" required placeholder="Enter officer phone number"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Email Address:">
            <b-form-input v-model="addOfficer.email" type="text" required placeholder="Enter officer email-address"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Officer Description:">
            <b-form-textarea rows="3" v-model="addOfficer.description" type="text" required placeholder="Enter officer description"></b-form-textarea>
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
            <b-btn class="button primary" @click="savePhoto() (dialog = false)">Crop</b-btn>
          </b-card>
        </b-card>
      </b-container>
    </div>

    <div class="margin">
      <h4>Change officer</h4>
      <b-form @submit.prevent="findOfficerFunction">
        <b-form-group label-cols="4" label-cols-lg="2" label="Officer name:">
          <b-form-input v-model="findOfficer.name" type="text" required placeholder="Enter officer name"></b-form-input>
        </b-form-group>
        <b-button class="button" type="submit">Search</b-button>
      </b-form>

      <div v-show="showChange[10]">
        <ul>
          <li>Name: <b>{{findOfficer.name}}</b></li>
          <li>Phone: <b>{{findOfficer.phone}}</b></li>
          <li>Email: <b>{{findOfficer.email}}</b></li>
          <button class="deleteButton" @click.prevent="deleteOfficerFunction(findOfficer.name)">delete</button>
          <button class="changeButton" @click="isShowResult = !isShowResult">change</button>
        </ul>
        <b-form v-show="isShowResult" @submit.prevent="submitChange">
          <b-form-group label-cols="4" label-cols-lg="2" label="Officer Name:">
            <b-form-input v-model="findOfficer.name" type="text" required></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Phone Number:">
            <b-form-input v-model="findOfficer.phone" type="number" required></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Email Address:">
            <b-form-input v-model="findOfficer.email" type="text" required></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Officer Description:">
            <b-form-textarea rows="3" v-model="findOfficer.description" type="text" required></b-form-textarea>
          </b-form-group>
          <b-button class="button" type="submit">submit</b-button>
        </b-form>
      </div>
      <hr>
    </div>

    <div class="margin">
      <h4>Officers list</h4>
      <ul>
        <li v-for="(officer, index) in officerData" :key="index">
          <p>Name: <b>{{officer.name}}</b></p>
          <p>Phone: <b>{{officer.phone}}</b></p>
          <p>Email: <b>{{officer.email}}</b></p>
          <button class="deleteButton" @click.prevent="deleteOfficerFunction(officer.name)">delete</button>
          <button class="changeButton" @click.prevent="clickChangeOfficer(index, officer.name, officer.phone, officer.email, officer.description, officer.path)">change</button>
          <b-form @submit.prevent="submitChange" v-show="showChange[index]">
            <b-form-group label-cols="4" label-cols-lg="2" label="Officer Name:">
              <b-form-input v-model="findOfficer.name" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="2" label="Phone Number:">
              <b-form-input v-model="findOfficer.phone" type="number" required></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="2" label="Email Address:">
              <b-form-input v-model="findOfficer.email" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="2" label="Officer Description:">
              <b-form-textarea rows="3" v-model="findOfficer.description" type="text" required></b-form-textarea>
            </b-form-group>
            <b-button class="button" type="submit">submit</b-button>
          </b-form>
          <hr>
        </li>
      </ul>
      <b-pagination
          align="center"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="10"
          @click.native="changePage(currentPage)"
      ></b-pagination>
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

      isShowAdd: true,
      isShowCrop: false,
      isShowFind: false,
      isShowResult: false,
      showFindChange: false,
      currentPage: 1,

      showChange: [false, false, false, false, false, false, false, false, false, false, false],
      searchOfficer: '',
      officerData:[],
      pageData:[],

      addOfficer: {
        name: '',
        email: '',
        phone: '',
        description: '',
        path: '',
      },

      findOfficer: {
        name: '',
        email: '',
        phone: '',
        description: '',
        path: '',
      }
    }
  },

  methods: {
    async checkName() {
      await this.$axios.get(`/admin/findOfficer?name=${this.addOfficer.name}`).then(res=>{
        console.log(res.data)
        if (res.data === 'exist'){
          alert("Officer already exist")
          this.addOfficer.name = ''
          this.addOfficer.phone = ''
          this.addOfficer.email = ''
          this.addOfficer.description = ''
          this.addOfficer.path = ''
        }
      })
    },

    async addOfficerFunction() {
      await this.$axios.post('/admin/addOfficer', this.addOfficer).then(res=>{
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
        formData.append('officer_photo', blob, 'name.jpeg')
        formData.append('name', this.addOfficer.name)
        alert('success')
        this.$axios.post('/officer/addOfficerPhoto', formData, {
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

    async findOfficerFunction(){
      const url = `/admin/findOfficer?name=${this.findOfficer.name}`
      await this.$axios.get(url).then(res=>{
        if (res.data === 'not exist'){
          alert("officer not exist")
        } else {
          console.log(res.data)
          this.findOfficer.name = res.data.name
          this.findOfficer.phone = res.data.phone
          this.findOfficer.email = res.data.email
          this.findOfficer.description = res.data.description
          this.findOfficer.path = res.data.path
          for (let i = 0; i < 11; i++){
            this.$set(this.showChange, i, false)
          }
          this.$set(this.showChange, 10, true)
          this.isShowResult = false
        }
      })
    },

    async deleteOfficerFunction(name) {
      let answer = window.confirm("Are you sure?")
      if (answer){
        await this.$axios.post('/admin/deleteOfficer', {name: name}).then(res=>{
          console.log(res.data)
          this.$router.go(0)
        })
      }
    },

    async submitChange() {
      await this.$axios.post('/admin/changeOfficer', this.findOfficer).then(res=>{
        console.log(res.data)
        this.$router.go(0)
      })
    },

    async getData() {
      await this.$axios.get('/officer').then(res=>{
        this.pageData = res.data
        let arrayLength
        if(this.pageData.length < 10){
          arrayLength = this.pageData.length
        } else {
          arrayLength = 10
        }
        for (let i = 0; i < arrayLength; i++){
          this.officerData[i] = this.pageData[i]
        }
      })
    },

    clickChangeOfficer(index, name, phone, email, description, path) {
      for (let i = 0; i < 11; i++){
        this.$set(this.showChange, i, false)
      }
      this.$set(this.showChange, index, !this.showChange[index])
      this.findOfficer.name = name
      this.findOfficer.phone = phone
      this.findOfficer.email = email
      this.findOfficer.description = description
      this.findOfficer.path = path
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
        this.findOfficer.name = ''
        this.findOfficer.phone = ''
        this.findOfficer.email = ''
        this.findOfficer.description = ''

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
.margin{
  margin-top: 20px;
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
