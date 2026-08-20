import Dropdown from './Dropdown';

export default function Filter({
  label,
  options = [],
  value = '',
  onChange,
  allLabel = 'All',
  icon: Icon,
  className = '',
  placeholder
}) {
  return (
    <Dropdown
      label={label}
      options={options}
      value={value}
      onChange={onChange}
      allLabel={allLabel}
      placeholder={placeholder}
      icon={Icon}
      className={className}
    />
  );
}
