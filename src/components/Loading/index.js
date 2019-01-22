import React, { Component } from 'react'
import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

class Loading extends Component {
	render () {
		return (
			this.props.isLoading ? 
			<View style={ styles.container }>
				<View style={ styles.main }>
					<ActivityIndicator
						color="#000"
						size="small" 
					/>
					<Text style={ styles.text }>加载中...</Text>
				</View>
			</View>
			: null
		)
	}
}

const mapStateToProps = state => ({
	isLoading: state.apiStatus.isLoading
}) 

export default connect(mapStateToProps)(Loading)

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		margin: 'auto',
		backgroundColor: 'rgba(0,0,0, 0)',
		alignItems: 'center',
		justifyContent: 'center'
	},
	main: {
		width: 110,
		height: 90,
		backgroundColor: '#eee',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10
	},
	text: {
		fontSize: 14,
		color: '#000',
		marginTop: 20
	}
})