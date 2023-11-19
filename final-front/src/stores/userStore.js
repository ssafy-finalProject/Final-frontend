import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: '',
    password: '',
    isLoggedIn: false,
  }),
  ctions: {
    async login() {
      try {
        const response = await axios.post('/api/login', {
          username: this.username,
          password: this.password,
        });

        // 성공적으로 로그인했을 때 서버로부터 받은 데이터 또는 토큰을 처리합니다.
        // 여기에서는 간단하게 isLoggedIn을 true로 설정합니다.
        this.isLoggedIn = true;
      } catch (error) {
        // 로그인에 실패한 경우 에러를 처리할 수 있습니다.
        console.error('Login failed:', error);
        this.isLoggedIn = false;
      }
    },
    async logout() {
      try {
        // 서버에 로그아웃 요청을 보낼 수 있습니다.
        // 여기에서는 단순히 클라이언트 상태만 변경합니다.
        this.isLoggedIn = false;
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
  },
});