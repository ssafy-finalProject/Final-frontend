import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: '',
    password: '',
    isLoggedIn: false,
  }),
  actions: {
    login() {
      // 여기에서 실제 로그인 로직을 구현합니다.
      // 예를 들어, 사용자 이름과 비밀번호를 확인하고 로그인 상태를 설정할 수 있습니다.
      if (this.username === 'example' && this.password === 'password') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
    logout() {
      // 로그아웃 로직
      this.isLoggedIn = false;
    },
  },
});