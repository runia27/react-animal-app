import './App.css';
import React from 'react';
import Title from './components/Title';
import AnimalForm from './components/AnimalForm';
import Main_card from './components/MainCard';
import Favorites from './components/Favorites';


const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key))
  },
};

const animals = [
  { title: "귀여운 곰돌이", src: "img/bear.png", alt: "bear" },
  { title: "귀여운 코끼리", src: "img/elephant.png", alt: "elephant" },
  { title: "귀여운 여우", src: "img/fox.png", alt: "fox" },
  { title: "귀여운 토끼", src: "img/rabbit.png", alt: "rabbit" }
];


const App = () => {
  const [num, setNum] = React.useState(() => jsonLocalStorage.getItem('num') || 1);
  const [mainAnimal, setMainAnimal] = React.useState(0);
  const [animalList, setAnimalList] = React.useState(() => jsonLocalStorage.getItem('animalList') || [])

  const IncrementNum = () => {

    setNum((pre) => {
      const nextNum = pre + 1
      return nextNum;
    })

    setMainAnimal((mainAnimal + 1) % animals.length);
  }

  const buttonHeart = () => {

    const currentAnimal = animals[mainAnimal];

    setAnimalList(prevList => [...prevList, currentAnimal]);
    setMainAnimal((prevMain) => (prevMain + 1) % animals.length);
  };

  const choiceFavorite = animalList.some(
    (animal) =>
      animal.title === animals[mainAnimal].title &&
      animal.src === animals[mainAnimal].src &&
      animal.alt === animals[mainAnimal].alt
  );

  React.useEffect(() => {
    jsonLocalStorage.setItem("num", num);
  }, [num]);

  React.useEffect(() => {
    jsonLocalStorage.setItem("animalList", animalList);
  }, [animalList]);

  return (
    <div>
      <Title>{num}페이지</Title>
      <AnimalForm IncrementNum={IncrementNum} AnimalForm animals={animals} setNum={setNum} setAnimalList={setAnimalList} />
      <Main_card src={animals[mainAnimal].src} alt={animals[mainAnimal].src} buttonHeart={buttonHeart} choiceFavorite={choiceFavorite} />
      <Favorites animalList={animalList} />
    </div>
  );
}

export default App;
