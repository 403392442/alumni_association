<template>
  <div id="box">
    <div id="top">Alumni News</div>
    <div class="news" v-for="(news, index) in newsData" v-bind:key="index">
      <b-container>
        <b-row>
          <b-col md="5"  sm="12" lg="4">
            <b-img :src="`http://localhost:3000/${news.path}`" class="photo"></b-img>
          </b-col>
          <b-col md="7"  sm="12" lg="8">
            <p class="title"><strong>{{news.title}}</strong></p>
            <p id="content">{{news.content}}</p>
            <p class="date">{{news.date}}</p>
            <b-button class="button" size="sm" @click="detailEvent(news.sortDate)">Read More</b-button>
          </b-col>
        </b-row>
      </b-container>


      <hr>
    </div>
    <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="10"
        @click.native="changePage(currentPage)"
    ></b-pagination>
  </div>
</template>

<script>
const url = '/resources/news';
export default {

  data() {
    return{
      currentPage: 1,
      newsData:[],
      pageData:[],
    }
  },

  mounted() {
    this.getData()
  },

  methods:{
    detailEvent(sortDate) {
      this.$router.push({
        path:'news:id',
        query:{
          id: sortDate
        }
      })
    },

    async changePage(currentPage) {
      const newUrl = `/resources/news/page?page=${currentPage}`
      await this.$axios.get(newUrl).then(res=>{
        this.newsData = res.data
      })
    },

    async getData() {
      await this.$axios.get(url).then(res=>{
        this.pageData = res.data
        console.log(this.pageData)
        let arrayLength
        if(this.pageData.length < 10){
          arrayLength = this.pageData.length
        } else {
          arrayLength = 10
        }
        for (let i = 0; i < arrayLength; i++){
          this.newsData[i] = this.pageData[i]
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
#box{
  padding: 20px;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  margin: 0 auto;
  max-width: 1000px;
}
ul{
  list-style: none;
}
p{
  padding: 0;
  margin: 0;
}
#content{
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 10px;
}
.photo{
  max-width: 260px;
  max-height: 170px;
}
#top{
  font-size: 25px;
  color: white;
  text-align: center;
  background-color: #800001;
  margin-bottom: 10px;
}
.button{
  margin-top: 10px;
  background-color: #800001;
}
.date{
  color: gray;
  margin-top: 10px;
}
.title{
  font-size: 18px;
}
.news{
  width: 1000px;
}
</style>
