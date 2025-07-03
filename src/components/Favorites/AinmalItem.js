import styles from './Favorites.module.css'

const AnimalItem = ({ src, alt, catUrl }) => (
  <li>
    <img
      src={catUrl ? catUrl : `${process.env.PUBLIC_URL}/${src}`}
      alt={alt}
      className={styles.animalImg}
    />
  </li>
);

export default AnimalItem;