import Text from 'components/Text';
import s from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <div className={s.main}>
      <Text view="title" tag="h1">
        Products
      </Text>
      <Text view="p-20" tag="h4" color="secondary">
        We display products based on the latest products we have, if you want to see our old products please enter the
        name of the item
      </Text>
    </div>
  );
};

export default Main;
