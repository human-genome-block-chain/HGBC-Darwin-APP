export default (...args) => {
	const paths = [...args]

	return paths.map(x => x.replace(/(^\/|\/$)/g, '')).join('/')
}