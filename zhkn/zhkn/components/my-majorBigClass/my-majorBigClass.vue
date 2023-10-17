<template>
  <view>
    {{category}}twq
  </view>
</template>

<script>
  export default {
    name:"my-majorBigClass",
    props:{
      category:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        majorCategory:[],
      };
    },
    watch:{
      category(newVal){
        console.log(newVal)
        this.getMajorCategory()
      }
    },
    onShow() {
      console.log('twq')
    },
    methods:{
      getMajorCategory(){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/majorApp/findMajorByCategory2',
          method:'GET',
          data:{
            category:this.category
          },
          success: (res) => {
            console.log(res)
            // this.majorCategory =
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss">

</style>