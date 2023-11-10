import { RestAxios } from "@/util/http-commons";

const Rest = RestAxios();
//로그인
function login(userid, memberInfo, success, fail) {
  Rest.post(`/member/login`, JSON.stringify(memberInfo)).then(success).catch(fail);
}

//회원가입
function registerMember(memberInfo, success, fail) {
  Rest.post(`/member/create`, JSON.stringify(memberInfo)).then(success).catch(fail);
}
//회원정보 수정
function modifyMember(memberInfo, success, fail) {
  Rest.put(`/member/modify`, JSON.stringify(memberInfo)).then(success).catch(fail);
}

//회원 삭제(탈퇴)
function deleteMember(success, fail) {
  Rest.delete(`/member/delete`).then(success).catch(fail);
}

export { login, registerMember, modifyMember, deleteMember };
