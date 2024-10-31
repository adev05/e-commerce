import ArrowDownIcon from '../../../../../components/Icons/ArrowDownIcon';
import Input from '../../../../../components/Input';
import './Filter.scss';

const Filter = () => {
  return (
    <div className="filter">
      <Input
        value=""
        onChange={() => console.log('onChange')}
        placeholder="Filter"
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
    </div>
  );
};

export default Filter;
