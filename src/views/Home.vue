<template>
  <Navabar v-bind:issee='is_show_log_button' v-bind:uname="user_name" v-on:getlogout="glogout"></Navabar>
    <bodycontent>
<!-- 左边部分     -->
      <template v-slot:left>
        <Vnavigation v-on:showzorderlist="showturtorlist" v-on:showcorder="showcorder" v-on:showsorders="showsendorders" v-on:showtorders="showtakeorders" v-on:showmyinfo="showmyinfo" :isunfold_tutoring_business="isunfold_tutoring_b" :isunfold_personal_center="isunfold_personal_c" :isunfold_paid_business="isunfold_paid_b" :is_login="is_login" v-on:changstatetb="changetb" v-on:changestatepc="changepc" v-on:changestatepb="changepb"></Vnavigation>
      </template>
<!--中间部分      -->
      <template v-slot:middle>
        <tutororder v-on:refreshtorders="refreshtakeorders" v-on:searchorders="searchzorders" v-bind:usr_info="user_info" v-bind:pschoolinfo="primaryschool" v-bind:mschoolinfo="middleschool" v-bind:hschoolinfo="highschool"  v-on:refreshorderlist="refreshzorderlist" v-bind:orderlistinfo="orderlistinfo" v-show="middle_show.showorderlist"></tutororder>
        <personalinfo v-bind:usr_info="user_info" v-show="middle_show.showinfo" v-on:showchangeinfo="showcmyinfo"></personalinfo>
        <mytakeorders v-on:refreshtorders="refreshtakeorders" v-on:closeorderinfo="closetinfo" v-on:torderinfo="gettorderinfo" v-bind:mytakeorders="user_take_orders" v-bind:mytakeordersnum="user_take_orders_num" v-show="middle_show.showmytakeorders"></mytakeorders>
        <mysendorders v-on:refreshorderlist="refreshzorderlist" v-on:refreshsorders="refreshsendorders" v-on:closeorderinfo="closesinfo" v-on:sorderinfo="getsorderinfo" v-bind:mysendordersnum="user_send_orders_num" v-bind:mysendorders="user_send_orders" v-show="middle_show.showmysendorders"></mysendorders>
        <createorder v-on:refreshorderlist="refreshzorderlist"  v-on:refreshsorders="refreshsendorders" v-bind:pschoolinfo="primaryschool" v-bind:mschoolinfo="middleschool" v-bind:hschoolinfo="highschool" v-bind:usr_email="user_email" v-show="middle_show.showmycorder"></createorder>
      </template>
<!--右边部分      -->
      <template v-slot:right>
        <changeinfo v-on:getnewinfo="getnewmyinfo" v-bind:usr_info="user_info" v-bind:pschool="primaryschool" v-bind:mschool="middleschool" v-bind:hschool="highschool" v-show="right_show.showchangeinfo" v-on:closecmyinfo="showcmyinfo"></changeinfo>
        <takeorderinfo v-show="right_show.showtakeorderinfo" v-bind:order_info="take_order_info" ></takeorderinfo>
        <sendorderinfo v-bind:order_info="send_order_info" v-show="right_show.showsendorderinfo"></sendorderinfo>
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
import mytakeorders from "../components/mytakeorders";
import takeorderinfo from "../components/takeorderinfo";
import mysendorders from "../components/mysendorders";
import sendorderinfo from "../components/sendorderinfo";
import createorder from "../components/createorder";
import tutororder from "../components/tutororder";

export default {
  name: 'Home',
  components: {  //home中显示的组件
    Navabar,
    bodycontent,
    Vnavigation,
    personalinfo,
    changeinfo,
    mytakeorders,
    takeorderinfo,
    mysendorders,
    sendorderinfo,
    createorder,
    tutororder,
  },
  data(){
    return{
      //个人信息
      user_name:'',
      user_email:'',
      user_info:{},
      //订单信息
      user_take_orders:[],
      user_take_orders_num:0,
      user_send_orders:[],
      user_send_orders_num:0,
      take_order_info:{}, //接的订单的详细信息
      send_order_info:{}, //发的订单的详细信息
      //年级课程信息
      primaryschool:{},
      middleschool: {},
      highschool: {},
      //主页待结单列表信息
      orderlistinfo:{
        ordernum:0,//订单数
        ordersinfo:[],//订单信息
      },

      //界面展示
      show_personal_info:false,
      is_show_log_button:true,
      is_login:false,

      isunfold_tutoring_b:true,
      isunfold_personal_c:false,  //默认不显示
      isunfold_paid_b:false,     //默认不显示

      middle_show:{
        showinfo:false, //是否展示个人信息
        showmytakeorders:false, //展示个人接单信息
        showmysendorders:false, //展示个人发单信息
        showmycorder:false, //展示创建订单
        showorderlist:true, //展示待接单列表
      },
      right_show:{
        showchangeinfo:false, //展示修改个人信息
        showtakeorderinfo:false, //展示接的订单的详细信息
        showsendorderinfo:false, //展示发的订单的详细信息
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
        for (let keyvalue of Object.keys(this.right_show)){
          //(但是保留家教业务中的三个现在尚未实现暂时不写)
          this.right_show[keyvalue] = false
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
        //所有右边信息关闭
        for(let keyvalue of Object.keys(this.right_show)){
            this.right_show[keyvalue] = false
        }
      }
    },
    showtakeorders(){  //个人接单信息展示
      if(this.middle_show.showmytakeorders != true){
        for(let keyvalue of Object.keys(this.middle_show)){
            if(keyvalue != 'showmytakeorders'){
               this.middle_show[keyvalue] = false
            }else {
              this.middle_show[keyvalue] = true
            }
        }
        //所有右边信息关闭
        for(let keyvalue of Object.keys(this.right_show)){
          this.right_show[keyvalue] = false
        }
      }
    },
    showsendorders(){ //展示我发的单
       if(this.middle_show.showmysendorders != true){
         for(let keyvalue of Object.keys(this.middle_show)){
           if(keyvalue != 'showmysendorders'){
             this.middle_show[keyvalue] = false
           }else {
             this.middle_show[keyvalue] = true
           }
         }
         //所有右边信息关闭
         for(let keyvalue of Object.keys(this.right_show)){
           this.right_show[keyvalue] = false
         }
       }
    },
    showcorder(){ //展示创建订单
      if(this.middle_show.showmycorder != true){
        for(let keyvalue of Object.keys(this.middle_show)){
          if(keyvalue != 'showmycorder'){
            this.middle_show[keyvalue] = false
          }else {
            this.middle_show[keyvalue] = true
          }
        }
        //所有右边信息关闭
        for(let keyvalue of Object.keys(this.right_show)){
          this.right_show[keyvalue] = false
        }
      }
    },
    showturtorlist(){ //展示家教订单
      if(this.middle_show.showorderlist != true){
        for(let keyvalue of Object.keys(this.middle_show)){
          if(keyvalue != 'showorderlist'){
            this.middle_show[keyvalue] = false
          }else {
            this.middle_show[keyvalue] = true
          }
        }
        //所有右边信息关闭
        for(let keyvalue of Object.keys(this.right_show)){
          this.right_show[keyvalue] = false
        }
      }
    },

    showcmyinfo(mess){
      this.right_show.showchangeinfo = mess
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
    //获取takeorder信息
    gettorderinfo(torderinfo){
      this.take_order_info = torderinfo
      if(this.right_show.showtakeorderinfo == false){
        this.right_show.showtakeorderinfo = true
      }
    },
    //获取sendorder信息
    getsorderinfo(sorderinfo){
      this.send_order_info = sorderinfo
      if(this.right_show.showsendorderinfo == false){
        this.right_show.showsendorderinfo = true
      }
    },
    closetinfo(){
      this.right_show.showtakeorderinfo = false
    },
    closesinfo(){
      this.right_show.showsendorderinfo = false
    },

    //刷新接单信息
    refreshtakeorders(){
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
          console.log(this.user_take_orders)
        }
      })
    },
    //刷新用户发单信息
    refreshsendorders(){
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
          this.user_send_orders_num = res.data.order_num
          console.log(this.user_send_orders)
        }
      })
    },
    //刷新主页代接订单
    refreshzorderlist(){
      //获取待接单列表
      axios({
        withCredentials : true,
        url:'https://127.0.0.1:8081/orders/ordertotake/no/no/',
        method:'get',
        data: {
        }
      }).then(res => {
        if(res.data.is_get == 'yes'){
          this.orderlistinfo.ordernum = res.data.order_num
          this.orderlistinfo.ordersinfo = res.data.orders
        }
      })
    },
    searchzorders(gradevalue,classesvalue){
      //获取待接单列表
      axios({
        withCredentials : true,
        url:'https://127.0.0.1:8081/orders/ordertotake/'+gradevalue+'/'+classesvalue+'/',
        method:'get',
        data: {
        }
      }).then(res => {
        if(res.data.is_get == 'yes'){
          this.orderlistinfo.ordernum = res.data.order_num
          this.orderlistinfo.ordersinfo = res.data.orders
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

    //获取待接单列表
    axios({
      withCredentials : true,
      url:'https://127.0.0.1:8081/orders/ordertotake/no/no/',
      method:'get',
      data: {
      }
    }).then(res => {
      if(res.data.is_get == 'yes'){
        this.orderlistinfo.ordernum = res.data.order_num
        this.orderlistinfo.ordersinfo = res.data.orders
      }
    })
  },
  watch:{
    user_email(){
      //监听当获取到用户email之后请求用户发单信息
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
            console.log(this.user_take_orders)
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
            this.user_send_orders_num = res.data.order_num
            console.log(this.user_send_orders)
          }
        })

      }
    }
  }
}
</script>

<style scoped>

</style>