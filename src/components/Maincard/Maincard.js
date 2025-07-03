import styles from './Maincard.module.css'

const Maincard = ({ catUrl, buttonHeart, choiceFavorite }) => {
  const heartIcon = choiceFavorite ? '😎' : '😍';

  return (
    <div className={styles.maincard}>
      {catUrl && <img src={catUrl} alt="고양이" width="400px" />}
      <button onClick={buttonHeart}>{heartIcon}</button>
    </div>
  );
};

export default Maincard;