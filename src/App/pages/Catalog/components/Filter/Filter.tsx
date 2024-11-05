import MultiDropdown from '../../../../../components/MultiDropdown';
import s from './Filter.module.scss';

const Filter: React.FC = () => {
  return (
    <MultiDropdown
      className={s.filter}
      options={[]}
      value={[]}
      onChange={() => console.log('multidropdown changed')}
      getTitle={() => 'Filter'}
    />
  );
};

export default Filter;
