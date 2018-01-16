<template>
  <section class="container">
    <img class="notfound" src="../assets/img/404.png" v-show="logo" />
    <img class="notfound" src="../assets/img/500.png" v-show="sever" />
    <!-- <h1 class="title">
      {{ error.statusCode }}
    </h1> -->
    <p class="info" v-if='sever'>
      {{ error.message }}
    </p>
    <div class="btn">
      <nuxt-link class="button shou" to="/">
        <img src="../assets/img/shouye.png" alt="">
      </nuxt-link>
      <a href="#"><img class="button shang" src="../assets/img/shang.png" alt="" @click="goBack()"></a>

      <!-- <el-button class="button shang" @click="goBack()">返 回</el-button> -->
    </div>
  </section>
</template>
<script>
export default {
  props: ['error'],
  // data: {
  //   logo: true,
  //   sever: false
  // },
  created: function() {
    if (this.error.statusCode === 404) {
      this.logo = true;
      this.sever = false;
    } else {
      this.sever = true;
      this.logo = false;
    }
  },
  methods: {
    goBack() {
      console.log(this.$router);
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.container {
  background: #afc9c6;
  padding-bottom: 150px;
  position: relative;
}
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  font-size: 25px;
  /* position: absolute; */
  margin: 0px auto;
  width: 600px;
  /* position: absolute; */
  /* left: 100px; */
  position: relative;
  top: -206px;
  left: 200px;
  color: wheat;
}
.button
{
  margin-top: 50px;
}
.shang {
  margin-left: 100px;
  margin-top: 0px;
}
.notfound {
  margin: 0px auto;
  display: block;
  padding-right: 100px;
}
.btn {
  margin: 0px auto;
  width: 550px;
  padding-left: 146px;
  position: relative;
  top: -160px;
}
</style>
