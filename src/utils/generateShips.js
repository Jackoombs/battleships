import battleshipPreview from "./battleshipSelectionPreview.js";

const createShip = (name, length) => {
  return{name, length, tileIndexs: [0], hits: 0, sunk:false}
}

const getRandomIndex = (max, excludedIndexArray=[]) => {
  let index = null
  while (index===null || excludedIndexArray.includes(index)){
    index = Math.floor(Math.random() * (max + 1));
  }
  return index
}

const checkTilesFree = (excludedIndexArray, randomShipPlacement) => {
  const result = randomShipPlacement.filter(index => excludedIndexArray.includes(index))
  return result.length ?  true : false
}

const generateShips = () => {

  const ships = [
    createShip('Carrier', 5),
    createShip('Battleship', 4),
    createShip('Cruiser', 3),
    createShip('Submarine', 3),
    createShip('Destroyer', 2) 
  ]
  
  const excludedIndexs = []
  
  ships.forEach(ship => {
    let indexs = []
    while (!indexs.length || checkTilesFree(excludedIndexs, indexs)){
      let randomIndex = getRandomIndex(99, excludedIndexs)
      let randomOrientation = Math.random() < 0.5
      indexs = battleshipPreview(randomIndex, ship.length, randomOrientation)
    }

    ship.tileIndexs = indexs
    excludedIndexs.push(...indexs)
  });

  return ships
}

export default generateShips