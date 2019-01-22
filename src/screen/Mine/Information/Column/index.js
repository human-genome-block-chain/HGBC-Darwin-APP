import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ViewPropTypes,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

export default class Column extends Component {
  static defaultProps = {
    text: '',
    isDisable: true,
    activeOpacity: .9,
    triggerClick: () => {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    iconStyles: ViewPropTypes.style,
    disabledTextColor: PropTypes.string,
    canTextColor: PropTypes.string,
    disabledSource: Image.propTypes.source,
    canSource: Image.propTypes.source,
    text: PropTypes.string,
    isDisable: PropTypes.bool,
    activeOpacity: PropTypes.number,
    triggerClick: PropTypes.func
  }

  render () {
    const disableds = this.props.isDisable

    return (
      <View 
        style={ styles.box }
      >
        <TouchableOpacity
          onPress={ this.props.triggerClick }
          style={ styles.button }
          activeOpacity={ this.props.activeOpacity }
        >
          <Image
            style={ [styles.icon, this.props.iconStyles] }
            source={ 
              disableds? 
              this.props.canSource:
              this.props.disabledSource
            }
            resizeMode="cover"
          ></Image>
          <Text 
            style={[
              styles.text,
              { 
                color: disableds? 
                this.props.canTextColor: 
                this.props.disabledTextColor 
              }]}
          >{ this.props.text }</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 18,
    height: 18
  },
  text: {
    color: '#333',
    fontSize: 17,
    marginLeft: 5
  }
})