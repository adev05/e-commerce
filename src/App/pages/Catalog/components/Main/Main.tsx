import Text from 'components/Text';
import s from './Main.module.scss';

const Main = () => {
  return (
    <div className={s.main}>
      <Text view="title">Products</Text>
      <Text view="p-20" color="secondary">
        {`We display products based on the latest products we have, if you want\n to see our old products please enter the name of the item`}
      </Text>
    </div>
  );
};

export default Main;
