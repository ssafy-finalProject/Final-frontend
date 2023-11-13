import { RestAxios } from "@/util/http-commons";

const Rest = RestAxios();
//로그인
function login(memberInfo, userid, success, fail) {
  Rest.post(`/member/login`, JSON.stringify(memberInfo)).then(success).catch(fail);
}

//회원가입
function registerMember(memberInfo, success, fail) {
  Rest.post(`/member/create`, JSON.stringify(memberInfo)).then(success).catch(fail);
}
//회원정보 수정
function modifyMember(userid, memberInfo, success, fail) {
  Rest.put(`/member/` + userid, JSON.stringify(memberInfo))
    .then(success)
    .catch(fail);
}

//회원 삭제(탈퇴)
function deleteMember(userid, success, fail) {
  Rest.delete(`/member/` + userid)
    .then(success)
    .catch(fail);
}

//회원중복 체크
function idCheck(userid, succes, fail) {
  Rest.get(`/member/idcheck/` + userid)
    .then(success)
    .catch(fail);
}

//회원정보 가져오기
function getMember(userid, success, fail) {
  Rest.get(`/member/` + userid)
    .then(success)
    .catch(fail);
}

function findPass(userid, username, success, fail) {
  Rest.get(`/member/` + userid + `/` + username)
    .then(success)
    .catch(fail);
}

export { login, registerMember, modifyMember, deleteMember, idCheck, getMember, findPass };
