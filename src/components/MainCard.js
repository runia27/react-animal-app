const Main_card = ({ src, alt, buttonHeart, choiceFavorite }) => {
  const heartIcon = choiceFavorite ? '😎' : '😍';

  return (
    <div className="main-card">
      <img src={src} alt={alt} width="400px" />
      <button onClick={buttonHeart}>{heartIcon}</button>
    </div >
  );
}

export default Main_card;