import './styles.css';

export default function Button({ label, double, triple, operation }) {

  let classes = 'button ';
  classes += double ? 'double' : '';
  classes += triple ? 'triple' : '';
  classes += operation ? 'operation' : ''

  return (
    <button className={classes}>{label}</button>
  );
}