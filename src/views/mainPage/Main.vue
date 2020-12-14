<template>
  <div id="box">
    <div id="border">
      <span id="text">Welcome to the Maggotty High Alumni Association US Northern Region Website</span>
    </div>
    <Carousel></Carousel>
    <Overview></Overview>
    <Contact></Contact>
    <Card></Card>
  </div>
</template>

<script>

import Carousel from './components/Carousel'
import Card from './components/Card'
import Contact from "./components/Contact"
import Overview from "./components/Overview"

export default {
  name: "Main",
  components: {
    Carousel: Carousel,
    Card: Card,
    Contact: Contact,
    Overview: Overview,
  }
}
</script>

<style scoped>
  #box{
    margin-bottom: 30px;
  }

  #border{
    width: 60%;
    border: 1px solid;
    text-align: center;
    display: block;
    margin: 10px auto;
    background-color: white;
    padding: 5px;
    max-width: 920px;
  }

  #text{
    color: #880001;
    font-size: 16px;
  }
</style>
