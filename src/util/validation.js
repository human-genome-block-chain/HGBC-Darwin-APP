import sha3 from 'crypto-js/sha3'

// 验证用户名
export const isUsername = name => /^[0-9a-zA-Z]*$/g.test(name)

// 验证密码
export const isPassword = pwd => /^\w+$/.test(pwd)

// 验证手机号
export const isPhone = phone => /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone)

// 验证手机验证码
export const isCode = code => /^[0-9]*$/g.test(code)

// 邀请码验证
export const isInvitationCode = val => /^[0-9a-zA-Z]*$/g.test(val)

export const isAddress = address => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {

    return false
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {

    return true
  } else {

    let len = 40,
        i = 0,
        copyAddress = address.replace('0x',''),
        addressHash = sha3(copyAddress.toLowerCase())

    for (; i < len; i++ ) {
      if ((parseInt(addressHash[i], 16) > 7 && copyAddress[i].toUpperCase() !== copyAddress[i]) || (parseInt(addressHash[i], 16) <= 7 && copyAddress[i].toLowerCase() !== copyAddress[i])) {
        return false
      }
    }
    
    return true
  }
}
