import MultiDropdown, { Option } from 'components/MultiDropdown';
import s from './Filter.module.scss';

const Filter: React.FC<{
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  getTitle: (value: Option[]) => string;
}> = ({ options, value, onChange, getTitle }) => {
  return <MultiDropdown className={s.filter} options={options} value={value} onChange={onChange} getTitle={getTitle} />;
};

export default Filter;
