const modifyClassName = (className, modifiers) => {
  if (!modifiers) {
    return className
  }

  let newModifiers

  if (Array.isArray(modifiers)) {
    newModifiers = [...modifiers]
  } else {
    newModifiers = [modifiers]
  }

  const arrayOfModifiers = newModifiers.map((modifier) => {
    return `${className}--${modifier}`
  })

  return `${className} ${arrayOfModifiers.join(' ')}`
}

export default modifyClassName
