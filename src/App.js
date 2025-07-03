import React from 'react';
import Title from './components/Title/Title';
import AnimalForm from './components/Animalform/AnimalForm';
import Maincard from './components/Maincard/Maincard';
import Favorites from './components/Favorites/Favorites';
import jsonLocalStorage from './utils/jsonLocalStorage';


const App = () => {
  const [num, setNum] = React.useState(() => jsonLocalStorage.getItem('num') || 1);
  const [catUrl, setCatUrl] = React.useState('');
  const [animalList, setAnimalList] = React.useState(() => jsonLocalStorage.getItem('animalList') || []);
  const [text, setText] = React.useState('');

  const IncrementNum = () => {
    setNum(prev => prev + 1);
  };

  const buttonHeart = () => {

    if (animalList.some(animal => animal.catUrl === catUrl)) {
      alert('이미 추가된 이미지입니다.');
      return;
    }

    const currentCat = { catUrl: catUrl, text: text };
    setAnimalList(prevList => [...prevList, currentCat]);
  };

  React.useEffect(() => {
    const textForUrl = text ? encodeURIComponent(text) : '';
    const url = textForUrl
      ? `https://cataas.com/cat/says/${textForUrl}?width=400&height=400&fontColor=yellow&json=true`
      : `https://cataas.com/cat/says/HAHA?width=400&height=400&fontColor=yellow&json=true`;

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
      <Maincard catUrl={catUrl} buttonHeart={buttonHeart} choiceFavorite={animalList.some(a => a.catUrl === catUrl)} />
      <Favorites animalList={animalList} />
    </div>
  );
};


export default App;
