<script setup>
defineProps({ article: Array });
</script>

<template>
  <tr class="text-center">
    <th scope="row">{{ article.article_no }}</th>
    <td class="text-start">
      <router-link
        :to="{ name: 'boardview', params: { no: article.article_no } }"
        class="article-title link-dark"
      >
        {{ article.subject }}
      </router-link>
    </td>
    <td>{{ article.user_id }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.register_time }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
