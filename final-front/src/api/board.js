import { RestAxios } from "@/util/http-commons";

const Rest = RestAxios();

const url = "/board";

function totalArticle(success, fail) {
  Rest.get(`${url}`).then(success).catch(fail);
}

function listArticle(key, word, pgno, success, fail) {
  Rest.get(`${url}/list?key=${key}&word=${word}&pgno=${pgno}`)
    .then(success)
    .catch(fail);
}

function listArticle2(succes, fail) {
  console.log("실행");
}
export { listArticle, listArticle2, totalArticle };
