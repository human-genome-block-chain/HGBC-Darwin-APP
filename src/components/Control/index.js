import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Loading } from 'components/index'

export default class Control extends Component{
  static defaultProps = {
    fireFetchs: [],
    dataCallback: () => {}
  }

  static propTypes = {
    fireFetchs: PropTypes.array,
    dataCallback: PropTypes.func
  }

  constructor(props){
    super(props)
    this.state = {
      loading: true
    }
  }

  async _allFetch () {
    Promise.all(this.props.fireFetchs)
    .then((...result) => {
      this.props.dataCallback(...result)
      this.setState({ loading: false })
    })
    .catch((err) => {
      this.setState({ loading: false })
    })
  }

  componentDidMount() {
    this._allFetch()
  }

  render () {
    return (
      this.state.loading ?
      <Loading /> :
      this.props.children
    )
  }
}