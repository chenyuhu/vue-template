<template>
  <div class="home">
    <img alt="Vue logo" src="../../../assets/logo.png" />
    <div>{{ name }}</div>
    <button @click="openWin('work')">打开工作窗口</button>
    <HelloWorld msg="mane"></HelloWorld>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Watch, Component } from 'vue-property-decorator'
import HelloWorld from '../components/HelloWorld.vue'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  public name: string = 'work'
  public openWin(name: string) {
    this.name = name
    this.$electron.ipcRenderer.send('createWin', { name })
  }
}
</script>
<style lang="scss">
.home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
