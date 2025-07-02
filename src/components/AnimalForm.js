import React from 'react';

const AnimalForm = ({ IncrementNum, setNum, setAnimalList, setText }) => {
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const hangul = (text) => /[가-힣|ㄱ-ㅎ|ㅏ-ㅣ]/.test(text);

  const handleInputChange = (text) => {
    const inputText = text.target.value;

    setValue(inputText.toUpperCase());

    if (hangul(inputText)) {
      setErrorMessage("한글은 입력할 수 없습니다.");
    } else {
      setErrorMessage("");
    }
  };

  const buttonClick = (event) => {
    event.preventDefault();

    if (value === "") {
      setErrorMessage('빈칸은 입력할 수 없습니다.');
    } else {
      setErrorMessage("");
      setText(value);          
      IncrementNum();          
    }
  };

  return (
    <form>
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
          setAnimalList([]);
        }
      }}>
        초기화
      </button>

      <p style={{ color: "#f00" }}>{errorMessage}</p>
    </form>
  );
};

export default AnimalForm;