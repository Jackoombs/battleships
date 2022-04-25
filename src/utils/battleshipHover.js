const battleshipHover = (() => {

  const horizontalHover = (tileIndex, length) => {
    const halfLength = Math.round((length - 1) / 2)
    const hoverTile = tileIndex.toString().padStart(2, '0')
    const initArrayTile = tileIndex-halfLength
    const initArray = []
    
    for (let i=0; i<length; i++) initArray.push(initArrayTile + i)
    const paddedArray = initArray.map(n => n.toString().padStart(2, '0'))

    paddedArray.forEach((element, index) => {
      if (element > 99) {
        paddedArray.splice(index, 1)
        paddedArray.unshift(paddedArray[0] - 1)
        return
      }
      if (element[0] > hoverTile[0]) {
        paddedArray.splice(index, 1)
        paddedArray.unshift(paddedArray[0] - 1)
      }
      if (element[0] < hoverTile[0]) {
        paddedArray[index] = 'deleted'
        paddedArray.push(+paddedArray[paddedArray.length-1] + 1)
      }
    });

    return paddedArray.filter(a => a !== 'deleted').map(Number)
  }

  const verticalHover = (tileIndex, length) => {
    const halfLength = Math.round((length - 1) / 2)
    const initArrayTile = tileIndex-halfLength*10
    const array = []

    for (let i=0; i<length; i++) array.push(initArrayTile + i*10)
    
    array.forEach((element, index) => {
      if (element < 0) {
        array.push(array[array.length-1] + 10)
        array[index] = 'deleted'
      }
      if (element > 99) {
        array.splice(index, 1)
        array.unshift(array[0] - 10)
      }
    });
    return array.sort((a, b) => a - b).filter(a => a !== 'deleted')
  }

  return {
    horizontalHover,
    verticalHover
  }
})()

export default battleshipHover
