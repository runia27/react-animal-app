import logo from './logo.svg';
import './App.css';
import React from 'react';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key))
  },
};


const Title = props => <h1>{props.children}</h1>;


const AnimalForm = ({ IncrementNum, setNum, setAnimalList }) => {
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const hangul = (text) => /[가-힣|ㄱ-ㅎ|ㅏ-ㅣ]/.test(text);

  const handleInputChange = text => {
    const inputText = text.target.value;

    setValue(inputText.toUpperCase());

    if (hangul(inputText)) {
      setErrorMessage("한글은 입력할 수 없습니다.");
    } else {
      setErrorMessage("");
    }
  }

  const buttonClick = (event) => {
    event.preventDefault();

    if (value === "") {
      setErrorMessage('빈칸은 입력할 수 없습니다.');
    } else {
      setErrorMessage("");
      IncrementNum()
    }
  }

  return (
    < form>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="귀여운 동물을 입력하세요"
        onChange={handleInputChange}
        value={value}
      />

      <button onClick={buttonClick} type="submit">추가</button>

      <button onClick={() => {
        if (window.confirm("정말 로컬스토리지를 초기화할까요?")) {
          localStorage.clear();
          alert("로컬스토리지가 초기화되었습니다!");
          setNum(1);
          setAnimalList(animals);
        }
      }}>
        초기화
      </button>

      <p
        style={{
          color: "#f00",
        }}>{errorMessage}</p>
    </form >
  );
}


const Main_card = ({ src, alt, buttonHeart, choiceFavorite }) => {
  const heartIcon = choiceFavorite ? '😎' : '😍';

  return (
    <div className="main-card">
      <img src={src} alt={alt} width="400px" />
      <button onClick={buttonHeart}>{heartIcon}</button>
    </div >
  );
}


const animals = [
  { title: "귀여운 곰돌이", src: "img/bear.png", alt: "bear" },
  { title: "귀여운 코끼리", src: "img/elephant.png", alt: "elephant" },
  { title: "귀여운 여우", src: "img/fox.png", alt: "fox" },
  { title: "귀여운 토끼", src: "img/rabbit.png", alt: "rabbit" }
];


const AnimalItem = ({ src, alt }) => (
  <li><img src={src} alt={alt} /></li>
);


const Favorites = ({ animalList }) => (
  <ul className="favorites">
    {animalList.map((value, index) => (
      <AnimalItem key={index} {...value} />
    ))}
  </ul>
);


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
    setMainAnimal((mainAnimal + 1) % animals.length);

    const newAnimal = { title: animals[mainAnimal].title, src: animals[mainAnimal].src, alt: animals[mainAnimal].alt }

    setAnimalList(pre => [...pre, newAnimal])
  }

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
      <AnimalForm IncrementNum={IncrementNum} setNum={setNum} setAnimalList={setAnimalList} />
      <Main_card src={animals[mainAnimal].src} alt={animals[mainAnimal].src} buttonHeart={buttonHeart} choiceFavorite={choiceFavorite} />
      <Favorites animalList={animalList} />
    </div>
  );
}

export default App;
