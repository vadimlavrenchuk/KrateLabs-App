import { observable, computed } from 'mobx'
import validator from 'validator'

export const store = new class Store {
  @observable svg = ''
  @observable png = ''

  // HTML
  @observable height = window.innerHeight
  @observable width = window.innerWidth

  // Search
  @observable search = ''
  @observable results = []
  @observable selection = 0

  // App Options
  @observable orientation = 1
  @observable material = 1
  @observable size = 1
  @observable email = ''

  // Map
  @observable zoom = 12
  @observable lat = 43.650128
  @observable lng = -79.382185
  @observable bearing = 0.0
  @observable pitch = 0.0
  @observable style = 1
  @observable mapId = 'map'
  @observable token = 'pk.eyJ1IjoiYWRkeHkiLCJhIjoiY2lsdmt5NjZwMDFsdXZka3NzaGVrZDZtdCJ9.ZUE-LebQgHaBduVwL68IoQ'

  styleTable = {
    1: 'mapbox://styles/addxy/ciq40e6zx0010bkmbbo513b6s',
    2: 'mapbox://styles/mapbox/outdoors-v9',
    3: 'mapbox://styles/mapbox/satellite-streets-v9'
  }

  sizeTable = {
    1: {1: '24" x 18"', 2: '18" x 24"'},
    2: {1: '36" x 24"', 2: '24" x 36"'},
    3: {1: '48" x 36"', 2: '36" x 48"'}
  }

  sizeTableName = {
    1: 'Medium',
    2: 'Large',
    3: 'X-Large'
  }

  materialTable = {
    1: 'Acrylic',
    2: 'Photo Film'
  }

  orientationTable = {
    1: 'Landscape',
    2: 'Portrait'
  }

  tiel = '#4AC7B0'
  grey = '#494141'
  salmon = '#FB7461'
  lightGrey = '#E6E6DD'
  mediumGrey = '#B9BDB1'
  lightBlue = '#ACC6CB'

  constructor() {
    this.api_url = 'https://api.kratelabs.com'
    window.addEventListener('resize', this.listenerResize.bind(this))
  }

  @computed get styleMax() {
    return Object.keys(this.styleTable).length
  }

  @computed get isXs() {
    return this.width < 768
  }

  @computed get isSm() {
    return 768 <= this.width && this.width < 992
  }

  @computed get isMd() {
    return 992 <= this.width && this.width < 1200
  }

  @computed get isLg() {
    return this.width >= 1200
  }

  @computed get sizeText() {
    return this.sizeTable[this.size][this.orientation]
  }

  @computed get materialText() {
    return this.materialTable[this.material]
  }

  @computed get orientationText() {
    return this.orientationTable[this.orientation]
  }

  @computed get emailValid() {
    return validator.isEmail(this.email)
  }

  @computed get price() {
    const prices = {
      'Photo Film': {
        'Medium': 400,
        'Large': 600,
        'X-Large': 800
      },
      'Acrylic': {
        'Medium': 500,
        'Large': 800,
        'X-Large': 1200
      }
    }
    const material = this.materialTable[this.material]
    const size = this.sizeTableName[this.size]
    return prices[material][size]
  }

  listenerResize(e) {
    this.height = window.innerHeight
    this.width = window.innerWidth
  }
}
