import { observable } from 'mobx'

export const store = new class Store {
  @observable height = window.innerHeight

  constructor() {
    window.addEventListener('resize', this.resetHeight.bind(this))
  }

  resetHeight(e) {
    this.height = window.innerHeight
    console.log(`Reset Height:`, this.height)
  }
}
