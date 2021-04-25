<template>
  <Navabar v-bind:issee='is_show_log_button' v-bind:uname="user_name" v-on:getlogout="glogout"></Navabar>
    <bodycontent>
<!-- 左边部分     -->
      <template v-slot:left>
        <Vnavigation v-on:showmyinfo="showmyinfo" :isunfold_tutoring_business="isunfold_tutoring_b" :isunfold_personal_center="isunfold_personal_c" :isunfold_paid_business="isunfold_paid_b" :is_login="is_login" v-on:changstatetb="changetb" v-on:changestatepc="changepc" v-on:changestatepb="changepb"></Vnavigation>
      </template>
<!--中间部分      -->
      <template v-slot:middle>
        <personalinfo v-bind:usr_info="user_info" v-show="middle_show.showinfo" v-on:showchangeinfo="showcmyinfo"></personalinfo>
      </template>
<!--右边部分      -->
      <template v-slot:right>
        <changeinfo v-on:getnewinfo="getnewmyinfo" v-bind:usr_info="user_info" v-bind:pschool="primaryschool" v-bind:mschool="middleschool" v-bind:hschool="highschool" v-show="left_show.showchangeinfo" v-on:closecmyinfo="showcmyinfo"></changeinfo>
      </template>

    </bodycontent>

</template>

<script>
// @ is an alias to /src

import Navabar from "../components/Navabar";
import axios from 'axios'
import bodycontent from "../components/bodycontent";
import Vnavigation from "../components/Vnavigation";
import personalinfo from "../components/personalinfo";
import changeinfo from "../components/changeinfo";

export default {
  name: 'Home',
  components: {
    Navabar,
    bodycontent,
    Vnavigation,
    personalinfo,
    changeinfo,
  },
  data(){
    return{
      //个人信息
      user_name:'',
      user_email:'',
      user_info:{},
      //订单信息
      user_take_orders:{},
      user_take_orders_num:0,
      user_send_orders:{},
      user_send_orders_num:0,
      //年级课程信息
      primaryschool:{},
      middleschool: {},
      highschool: {},

      //界面展示
      show_personal_info:false,
      is_show_log_button:true,
      is_login:false,

      isunfold_tutoring_b:true,
      isunfold_personal_c:false,  //默认不显示
      isunfold_paid_b:false,     //默认不显示

      middle_show:{
        showinfo:false, //是否展示个人信息
      },
      left_show:{
        showchangeinfo:false,
      }
    }
  },
  methods:{
    glogout(mess){   //登录后用户名的显示
      this.is_show_log_button = mess
      if(this.is_show_log_button == true)  //当用户注销后隐藏个人中心和充值业务
      {
        this.isunfold_personal_c = false
        this.isunfold_paid_b = false
        this.is_login = false //加上这句个后 点击个人中心 和充值业务也不会展开
        //关闭所有中间和右边的内容(但是保留家教业务中的三个现在尚未实现暂时不写)
        for (let keyvalue of Object.keys(this.middle_show)){
          //(但是保留家教业务中的三个现在尚未实现暂时不写)
          this.middle_show[keyvalue] = false
        }
        for (let keyvalue of Object.keys(this.left_show)){
          //(但是保留家教业务中的三个现在尚未实现暂时不写)
          this.left_show[keyvalue] = false
        }
      }
    },
    changetb(){ //是否折叠家教业务
      this.isunfold_tutoring_b = !this.isunfold_tutoring_b
    },
    changepc(){ //是否折叠个人中心
      this.isunfold_personal_c = !this.isunfold_personal_c
    },
    changepb(){ //是否折叠交易业务
      this.isunfold_paid_b = !this.isunfold_paid_b
    },
    showmyinfo(){  //在body的中间部分展示个人信息 和在右边部分展示修改个人信息
      if(this.middle_show.showinfo !=true){
        for(let keyvalue of  Object.keys(this.middle_show)){
          if (keyvalue != 'showinfo'){
            this.middle_show[keyvalue] = false
          }else {
            this.middle_show[keyvalue] = true
          }
        }

        for(let keyvalue of Object.keys(this.left_show)){
            this.left_show[keyvalue] = false
        }
      }
    },
    showcmyinfo(mess){
      this.left_show.showchangeinfo = mess
    },
    getnewmyinfo(){
      //获取个人信息
      axios({
        withCredentials : true,
        url:'https://127.0.0.1:8081/account/getusrinfo/',
        method:'get',
        data: {
        }
      }).then(res => {
        if(res.data.is_login == 'yes'){
          console.log(res.data);
          this.user_name = res.data.uname
          this.user_info =res.data
          this.user_email = res.data.uemail
          this.is_login = true
/*          this.is_show_log_button = false
          this.isunfold_personal_c = true
          this.isunfold_paid_b =true*/
        }else{
          this.is_show_log_button = true
        }
      })
    },
  },
  created() {
    //获取个人信息
    axios({
      withCredentials : true,
      url:'https://127.0.0.1:8081/account/getusrinfo/',
      method:'get',
      data: {
      }
    }).then(res => {
      if(res.data.is_login == 'yes'){
        console.log(res.data);
        this.user_name = res.data.uname
        this.user_info =res.data
        this.user_email = res.data.uemail
        this.is_show_log_button = false
        this.is_login = true
        this.isunfold_personal_c = true
        this.isunfold_paid_b =true
      }else{
        this.is_show_log_button = true
      }
    })

    //获取小学年级课程信息
    axios({
      withCredentials : true,
      url:'https://127.0.0.1:8081/classinfo/primaryschool/',
      method:'get',
      data: {
      }
    }).then(res => {
      this.primaryschool = res.data
      console.log(res.data);
    })
    //获取初中年级课程信息
    axios({
      withCredentials : true,
      url:'https://127.0.0.1:8081/classinfo/juniorschool/',
      method:'get',
      data: {
      }
    }).then(res => {
      this.middleschool = res.data
      console.log(res.data);
    })
    //获取高中年级课程信息
    axios({
      withCredentials : true,
      url:'https://127.0.0.1:8081/classinfo/highschool/',
      method:'get',
      data: {
      }
    }).then(res => {
      this.highschool = res.data
      console.log(res.data);
    })

  },
  watch:{
    user_email(){
      //监听当获取到用户email之后请求用户信息
      if(this.user_email !=''){
        //获取用户接单信息
        axios({
          withCredentials : true,
          url:'https://127.0.0.1:8081/orders/wtakelist/'+this.user_email+'/',
          method:'get',
          data: {
          }
        }).then(res => {
          if(res.data.is_login == 'no'){
            alert('请重新登录')
          }else{
            this.user_take_orders = res.data.orders
            this.user_take_orders_num = res.data.order_num
            console.log(res.data.orders)
          }
        })

        //获取用户发单信息
        axios({
          withCredentials : true,
          url:'https://127.0.0.1:8081/orders/breleaselist/'+this.user_email+'/',
          method:'get',
          data: {
          }
        }).then(res => {
          if(res.data.is_login == 'no'){
            alert('请重新登录')
          }else{
            this.user_send_orders = res.data.orders
            this.user_take_orders_num = res.data.order_num
            console.log(res.data.orders)
          }
        })

      }
    }
  }


}
</script>

<style scoped>

</style>