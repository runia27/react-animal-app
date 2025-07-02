const AnimalItem = ({ src, alt }) => (
  <li><img src={`${process.env.PUBLIC_URL}/${src}`} alt={alt} /></li>
);

export default AnimalItem;