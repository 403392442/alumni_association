<template>
  <div id="box">
    <div>
      <b-form @submit.prevent="submitFind">
        <h4>Find User</h4>
        <hr>
        <b-form-group label-cols="4" label-cols-lg="2" label="email:">
          <b-form-input v-model="findUser" type="email" required></b-form-input>
        </b-form-group>
        <b-button class="button" type="submit">Find user</b-button>
      </b-form>
      <div v-show="isShow">
        <ul>
          <li>First Name: <b>{{changeForm.firstName}}</b></li>
          <li>Last Name: <b>{{changeForm.lastName}}</b></li>
          <li>Id: <b>{{changeForm.universityId}}</b></li>
          <li>Email: <b>{{changeForm.email}}</b></li>
          <li>Password: <b>{{changeForm.password}}</b></li>
          <li>Q1: <b>{{changeForm.question1}}</b></li>
          <li>A1: <b>{{changeForm.answer1}}</b></li>
          <li>Q2: <b>{{changeForm.question2}}</b></li>
          <li>A2: <b>{{changeForm.answer2}}</b></li>
          <li>Admin: <b>{{changeForm.isAdmin}}</b></li>
        </ul>


        <button class="deleteButton" @click.prevent="deleteUser(changeForm.email)">delete</button>
        <button class="changeButton" @click="showFindChange = !showFindChange">change</button>
      </div>
      <b-form @submit.prevent="submitChange" v-show="showFindChange">
        <b-form-group label-cols="4" label-cols-lg="2" label="firstName:">
          <b-form-input v-model="changeForm.firstName" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="lastName:">
          <b-form-input v-model="changeForm.lastName" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="universityId:">
          <b-form-input v-model="changeForm.universityId" type="number" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="email:">
          <b-form-input v-model="changeForm.email" type="email" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="password:">
          <b-form-input v-model="changeForm.password" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="cellphone:">
          <b-form-input v-model="changeForm.cellphone" type="number" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="streetAddress:">
          <b-form-input v-model="changeForm.streetAddress" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="streetAddress2:">
          <b-form-input v-model="changeForm.streetAddress2" type="text"></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="city:">
          <b-form-input v-model="changeForm.city" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="state:">
          <b-form-input v-model="changeForm.state" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="zipCode:">
          <b-form-input v-model="changeForm.zipCode" type="number" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="question1:">
          <b-form-input v-model="changeForm.question1" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="answer1:">
          <b-form-input v-model="changeForm.answer1" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="question2:">
          <b-form-input v-model="changeForm.question2" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="answer2:">
          <b-form-input v-model="changeForm.answer2" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols="4" label-cols-lg="2" label="isAdmin:" v-show="isShowAdmin">
          <b-form-select v-model="changeForm.isAdmin" :options="admin" type="text" required></b-form-select>
        </b-form-group>
        <b-button class="button" type="submit" >Submit change</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
/**
 * 数据库：增删改查
 */
export default {
  data() {
    return{
      isShow: false,
      showFindChange: false,
      isShowAdmin: false,
      findUser: '',

      changeForm: {
        firstName: '',
        lastName: '',
        universityId: '',
        email: '',
        password: '',
        cellphone: '',
        streetAddress: '',
        streetAddress2: '',
        city: '',
        state: '',
        zipCode: '',
        question1: '',
        answer1: '',
        question2: '',
        answer2: '',
        isAdmin: '',
      },

      admin: [
        {value: "0", text: "Normal Account"},
        {value: "1", text: "Professor Account"},
        {value: "2", text: "Store Account"},
        {value: "3", text: "Assistant Account"},
        {value: "4", text: "Supervisor Account"}
      ]
    }
  },

  mounted() {
    const admin = this.$cookies.get("isAdmin")
    if (admin === "4"){
      this.isShowAdmin = true
    }
  },

  methods: {
    async submitFind() {
      await this.$axios.get(`/admin/findUser?email=${this.findUser}`).then(res=>{
        if (res.data === 'not found') {
          this.isShow = false
          alert("Can not find")
          console.log(res.data)
        } else {
          this.changeForm.firstName = res.data.firstName
          this.changeForm.lastName = res.data.lastName
          this.changeForm.universityId = res.data.universityId
          this.changeForm.email = res.data.email
          this.changeForm.password = res.data.password
          this.changeForm.cellphone = res.data.cellphone
          this.changeForm.streetAddress = res.data.streetAddress
          this.changeForm.streetAddress2 = res.data.streetAddress2
          this.changeForm.city = res.data.city
          this.changeForm.state = res.data.state
          this.changeForm.zipCode = res.data.zipCode
          this.changeForm.question1 = res.data.question1
          this.changeForm.answer1 = res.data.answer1
          this.changeForm.question2 = res.data.question2
          this.changeForm.answer2 = res.data.answer2
          this.changeForm.isAdmin = res.data.isAdmin
          this.isShow = true
        }
      })
    },

    async submitChange() {
      await this.$axios.post('/admin/updateUser', this.changeForm).then(res=>{
        console.log(res.data)
        this.$router.go(0)
      })
    },

    async deleteUser(email) {
      let answer = window.confirm("You you sure?")
      if (answer){
        await this.$axios.post('/admin/deleteUser', {email: email}).then(res=>{
          console.log(res.data)
          this.$router.go(0)
        })
      }
    },
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
