type Attribute = {
  type: string;
  value: number;
};
type Card = {
  name: string;
  description: string;
  imageUrl: string;
  attributes: Attribute[];
};
export default Card;
