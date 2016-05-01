import { observable } from 'mobx'

export const store = new class Store {
  @observable height = window.outerHeight

  constructor() {
    window.addEventListener('resize', this.resetHeight.bind(this))
  }

  resetHeight(e) {
    this.height = window.outerHeight
    console.log(`Reset Height:`, this.height)
  }
}
