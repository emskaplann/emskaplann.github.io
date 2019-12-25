export default class TagSerivce {
  constructor(component) {
    this.component = component
    this.productionURL = 'https://arcane-sands-50858.herokuapp.com'
    this.devURL = 'http://localhost:3000'
  }

  fetchAll(projectId) {
    fetch(`${this.productionURL}/tags`)
      .then(response => response.json())
      .then(tags => this.component.setState({ tags }))
  }
}