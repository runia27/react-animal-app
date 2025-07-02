const MainCard = ({ catUrl, buttonHeart, choiceFavorite }) => {
  const heartIcon = choiceFavorite ? '😎' : '😍';

  return (
    <div className="main-card">
      {catUrl && <img src={catUrl} alt="고양이" width="400px" />}
      <button onClick={buttonHeart}>{heartIcon}</button>
    </div>
  );
};

export default MainCard;