<!-- 测试 -->
<template>
  <div id="work">这个是工作页面的主窗口{{ name }}</div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class WorkWin extends Vue {
  public name: string = '哈哈哈'
}
</script>

<style scoped lang="scss"></style>
