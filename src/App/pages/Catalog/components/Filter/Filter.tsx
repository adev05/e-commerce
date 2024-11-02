import ArrowDownIcon from 'components/Icons/ArrowDownIcon';
import Input from 'components/Input';

const Filter = () => {
  return (
    <Input
      value=""
      onChange={() => console.log('onChange')}
      placeholder="Filter"
      afterSlot={<ArrowDownIcon color="secondary" />}
    />
  );
};

export default Filter;
