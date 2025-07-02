import AnimalItem from "./AinmalItem";

const Favorites = ({ animalList }) => (
  <ul className="favorites">
    {animalList.map((value, index) => (
      <AnimalItem key={index} {...value} />
    ))}
  </ul>
);

export default Favorites;