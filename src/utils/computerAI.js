const computerAI = (tileHits, excludedArray) => {
  const array = findAdjacentIndex(tileHits)
  const result = array.filter(index => !excludedArray.includes(index))
  return result[Math.floor(Math.random()*result.length)];
}

const findAdjacentIndex = (hitsArray) => {
  if (hitsArray.length === 1) {
    const index = hitsArray[0]
    let array = [index-10, index-1, index+1, index+10]
    const lastDigit = +String(index)[String(index).length -1]

    if (lastDigit === 9) array = [index-10, index-1, index+10]
    if (lastDigit === 0) array = [index-10, index+1, index+10]

    return array.filter(index => index >= 0 && index < 100)
  }
  else {
    const sortedArray = hitsArray.sort((a, b) => a - b)
    const difference = sortedArray[1]-sortedArray[0]

    let array = [sortedArray[0]-difference, sortedArray[sortedArray.length-1]+difference]
    for (const index of sortedArray) {
      const lastDigit = +String(index)[String(index).length -1]
      if (lastDigit === 9) array = [sortedArray[0]-difference]
      if (lastDigit === 0) array = [sortedArray[sortedArray.length-1]+difference]
    }
    return array.filter(index => index >= 0 && index < 100)
  }
}

export default computerAI