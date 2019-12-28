// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Element extends VNode {
      $electron: any
    }
    // tslint:disable no-empty-interface
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ElementClass extends Vue {
      $electron: any
    }
    interface IntrinsicElements {
      [elem: string]: any
      $electron: any
    }
  }
}
