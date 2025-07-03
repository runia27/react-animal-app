import AnimalItem from "./AinmalItem";
import styles from './Favorites.module.css'

const Favorites = ({ animalList }) => (
  <ul className={styles.favorites}>
    {animalList.map((value, index) => (
      <AnimalItem key={index} {...value} />
    ))}
  </ul>
);

export default Favorites;