import './App.css';
import React from 'react';
import Title from './components/Title';
import AnimalForm from './components/AnimalForm';
import MainCard from './components/MainCard';
import Favorites from './components/Favorites';


const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key))
  },
};


const App = () => {
  const [num, setNum] = React.useState(() => jsonLocalStorage.getItem('num') || 1);
  const [catUrl, setCatUrl] = React.useState('');
  const [animalList, setAnimalList] = React.useState(() => jsonLocalStorage.getItem('animalList') || []);
  const [text, setText] = React.useState('');

  const IncrementNum = () => {
    setNum(prev => prev + 1);
  };

  const buttonHeart = () => {
    const currentCat = { catUrl: catUrl, text: text };
    setAnimalList(prevList => [...prevList, currentCat]);
  };

  React.useEffect(() => {    
    const textForUrl = text ? encodeURIComponent(text) : '';
    const url = textForUrl
      ? `https://cataas.com/cat/says/${textForUrl}?width=400&height=400&fontColor=yellow&json=true`
      : `https://cataas.com/cat/says/haha?width=400&height=400&fontColor=yellow&json=true`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const fullUrl = data.url.startsWith('http')
          ? data.url
          : `https://cataas.com${data.url}`;
        setCatUrl(fullUrl);
      })
      .catch(err => console.error('고양이 이미지 로드 실패:', err));
  }, [num, text]);

  React.useEffect(() => {
    jsonLocalStorage.setItem("num", num);
  }, [num]);

  React.useEffect(() => {
    jsonLocalStorage.setItem("animalList", animalList);
  }, [animalList]);

  return (
    <div>
      <Title>{num}페이지</Title>
      <AnimalForm IncrementNum={IncrementNum} setText={setText} />
      <MainCard catUrl={catUrl} buttonHeart={buttonHeart} choiceFavorite={animalList.some(a => a.catUrl === catUrl)} />
      <Favorites animalList={animalList} />
    </div>
  );
};


export default App;
