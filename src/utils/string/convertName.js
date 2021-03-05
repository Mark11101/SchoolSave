const convertName = (name) => {
  const fullName = name.split(' ');

  if (fullName[0] && fullName[1] && fullName[2]) {
    return fullName[0] + ' ' + fullName[1].charAt(0) + '. ' + fullName[2].charAt(0) + '.' 
  } else if (fullName[0] && fullName[1]) {
    return fullName[0] + ' ' + fullName[1].charAt(0) + '.'
  } else {
    return fullName[0]
  }
}

export default convertName
