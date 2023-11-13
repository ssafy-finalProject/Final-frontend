<script setup>
import VSelect from "../common/VSelect.vue";
import PageNavigation from "../common/PageNavigation.vue";
import BoardListItem from "../board/item/BoardListItem.vue";
import { listArticle } from "@/api/board";

import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const articles = ref([]);

const selectOption = ref([
  { text: "검색조건", value: "" },
  { text: "글번호", value: "article_no" },
  { text: "제목", value: "subject" },
  { text: "작성자아이디", value: "user_id" },
]); // 부모에서 자식으로 보낼 때의 selectOption 배열들

const param = ref([
  {
    pgno: currentPage.value,
    spp: VITE_ARTICLE_LIST_SIZE,
    key: "",
    word: "",
  },
]);

// console.log(param.value.pgno);
const changeKey = (val) => {
  console.log(val);
  param.value.key = val;
};

const moveWrite = () => {
  router.push({ name: 'boardwrite' });
};

const getArticleList = () => {
  // console.log("서버에서 글 목록 얻어오기", param.value);
  console.log(
    param.value.key + " " + param.value.word + " " + currentPage.value
  );
  // AXIOS 를 통한 동기 작업 필요
  listArticle(
    param.value.key,
    param.value.word,
    currentPage.value,
    ({ data }) => {
      console.log(data);
      articles.value = data.articles;
      console.log(articles.value);
      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
    },
    (fail) => {
      console.log(fail);
    }
  );
  // listArticle2();
};

const onPageChange = (val) => {
  console.log(val + "val이 뭘까요");
  currentPage.value = val;
  param.value.pgno = val;
  getArticleList();
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글목록</mark>
        </h2>
      </div>
      <div class="col-lg-10">
        <div class="row align-self-center mb-2">
          <div class="col-md-2 text-start">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="moveWrite"
            >
              글쓰기
            </button>
          </div>
          <div class="col-md-5 offset-5">
            <form class="d-flex">
              <VSelect :selectOption="selectOption" @onKeySelect="changeKey" />
              <div class="input-group input-group-sm">
                <input
                  type="text"
                  class="form-control"
                  v-model="param.word"
                  placeholder="검색어..."
                />
                <button
                  class="btn btn-dark"
                  type="button"
                  @click="getArticleList"
                >
                  검색
                </button>
              </div>
            </form>
          </div>
        </div>
        <table class="table table-hover">
          <thead>
            <tr class="text-center">
              <th scope="col">글번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">조회수</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            <BoardListItem
              v-for="article in articles"
              :key="article.article_no"
              :article="article"
            ></BoardListItem>
            <!-- BoardListItem에 들어갈 articles도 axios통신을 통해 얻어와야 함.-->
          </tbody>
        </table>
      </div>
      <PageNavigation
        :current-page="currentPage"
        :total-page="totalPage"
        @pageChange="onPageChange"
      ></PageNavigation>
    </div>
  </div>
</template>

<style scoped></style>
