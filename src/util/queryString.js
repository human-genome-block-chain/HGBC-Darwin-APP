export default (url) => {
	const cutting = url.split('?')[1]

  let args = {},
      items = cutting.length ? cutting.split("&") : [],
      item = null,
      len = items.length,
      i = 0
 
  for(; i < len; i++) {
    item = items[i].split("=")

    let name = decodeURIComponent(item[0]),
        value = decodeURIComponent(item[1])

    if (name) args[name] = value
  }

  return args
  
}
