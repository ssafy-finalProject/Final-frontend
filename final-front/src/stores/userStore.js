import { defineStore } from 'pinia';
import { ref } from "vue";
export const useAuthStore = defineStore('user', ()=>{
  const piniaUser = ref({
    userId: "",
    userName: "",
    userPass: "",
    isLoginned: false,
  });

  const piniaLogin = function(loginUser) {
    console.log("피니아 정보" + loginUser.userId);

    piniaUser.value.userId = loginUser.userId;
    piniaUser.value.userName = loginUser.userName;
    piniaUser.value.userPass = loginUser.userPass;
    piniaUser.value.isLoginned = true;
  }
  const piniaLogout = function(){
    console.log("로그아웃");
    piniaUser.value.userId="";
    piniaUser.value.userName="";
    piniaUser.value.userPass="";
    piniaUser.value.isLoginned=false;
  }
  return{piniaUser,piniaLogin,piniaLogout};
});