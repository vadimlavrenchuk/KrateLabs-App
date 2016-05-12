import { observable, computed } from 'mobx'
import validator from 'validator'


export const store = new class Store {
  // Search
  @observable search = ''
  @observable results = []
  @observable selected = 0

  // App
  @observable orientation = 1
  @observable material = 2
  @observable size = 2
  @observable email = ''
  @observable basePrice = 280
  @observable height = window.innerHeight
  @observable width = window.innerWidth

  // Map
  @observable zoom = 12
  @observable lat = 43.650128
  @observable lng = -79.382185
  @observable bearing = 0.0
  @observable pitch = 0.0
  @observable mapId = 'map'
  @observable token = 'pk.eyJ1IjoiYWRkeHkiLCJhIjoiY2lsdmt5NjZwMDFsdXZka3NzaGVrZDZtdCJ9.ZUE-LebQgHaBduVwL68IoQ'
  @observable style = 'mapbox://styles/addxy/cin9l0b8d0023b4noejyuc2r7'

  sizeTable = {
    1: {1: '24" x 18"', 2: '18" x 24"'},
    2: {1: '36" x 24"', 2: '24" x 36"'},
    3: {1: '42" x 36"', 2: '36" x 42"'}
  }

  tiel = '#4AC7B0'
  grey = '#494141'
  salmon = '#FB7461'
  lightGrey = '#E6E6DD'
  mediumGrey = '#B9BDB1'
  lightBlue = '#ACC6CB'

  constructor() {
    window.addEventListener('resize', this.listenerResize.bind(this))
    window.addEventListener('hashchange', this.listenerHashChange.bind(this))
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

  listenerHashChange(e) {
    //
  }
}
