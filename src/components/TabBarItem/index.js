import React,{ Component } from 'react'
import { ViewPropTypes, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class TabBarItem extends Component {
  static defaultProps = {
    tintColor: '#ccc',
    focused: true
  }

  static propTypes = {
    style: ViewPropTypes.style,
    tintColor: PropTypes.string,
    focused: PropTypes.bool,
    selectedImage: Image.propTypes.source,
    normalImage: Image.propTypes.source
  }

  render() {
    const { focused, selectedImage, normalImage } = this.props

    return(
      <Image 
        source={ focused ? selectedImage : normalImage }
        style={ [styles.tabbarImage] }
        resizeMode="cover"
      />
    )
  }
}

const styles = StyleSheet.create({
  tabbarImage: {
    width: 22,
    height: 22
  }
})