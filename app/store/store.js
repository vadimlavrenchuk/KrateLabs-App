import { observable, computed } from 'mobx'
import validator from 'validator'


export const store = new class Store {
  @observable height = window.innerHeight
  @observable width = window.innerWidth
  @observable orientation = 1
  @observable material = 2
  @observable size = 2
  @observable email = ''
  @observable basePrice = 280

  sizeTable = {
    1: {1: '24"x18"', 2: '18"x24"'},
    2: {1: '36"x24"', 2: '24"x36"'},
    3: {1: '42"x36"', 2: '36"x42"'}
  }

  constructor() {
    window.addEventListener('resize', this.listenerResize.bind(this))
  }

  sizeText = (e) => {
    return this.sizeTable[e][this.orientation]
  }

  @computed get materialText() {
    return {
      1: 'Paper',
      2: 'Acrylic',
      3: 'Metal'
    }[this.material]
  }

  @computed get orientationText() {
    return {
      1: 'Landscape',
      2: 'Portrait'
    }[this.orientation]
  }

  @computed get emailValid() {
    return validator.isEmail(this.email)
  }

  @computed get price() {
    const materialFactor = {
      1: 0.5,
      2: 1,
      3: 2
    }
    const sizeFactor = {
      1: 0.5,
      2: 1,
      3: 1.5
    }
    return this.basePrice * materialFactor[this.material] * sizeFactor[this.size]
  }

  listenerResize(e) {
    this.height = window.innerHeight
    this.width = window.innerWidth
    console.log(`Reset Height:`, this.height)
    console.log(`Reset Width:`, this.width)
  }
}
