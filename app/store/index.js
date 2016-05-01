import { observable } from 'mobx'


export const store = new class Store {
  @observable height = window.outerHeight

  constructor() {
    window.addEventListener('orientationchange', this.resetHeight)
  }

  resetHeight() {
    this.height = window.outerHeight
    console.log(this.height)
  }
}
