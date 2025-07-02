const AnimalItem = ({ src, alt, catUrl }) => (
  <li>
    <img
      src={catUrl ? catUrl : `${process.env.PUBLIC_URL}/${src}`}
      alt={alt}
    />
  </li>
);

export default AnimalItem;