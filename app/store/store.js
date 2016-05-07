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

  constructor() {
    window.addEventListener('resize', this.setSize.bind(this))
  }

  @computed get sizeText() {
    return {
      1: {1: '24"x18"', 2: '18"x24"'},
      2: {1: '36"x24"', 2: '24"x36"'},
      3: {1: '42"x36"', 2: '36"x42"'}
    }[this.size][this.orientation]
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
      2: 'Potrait'
    }[this.orientation]
  }

  @computed get validEmail() {
    return validator.isEmail(this.email)
  }

  @computed get price() {
    const materialFactor = {
      1: 0.4,
      2: 1,
      3: 2
    }
    const sizeFactor = {
      1: 0.6,
      2: 1,
      3: 1.4
    }
    return this.basePrice * materialFactor[this.material] * sizeFactor[this.size]
  }

  setSize(e) {
    this.height = window.innerHeight
    this.width = window.innerWidth
    console.log(`Reset Height:`, this.height)
    console.log(`Reset Width:`, this.width)
  }
}
