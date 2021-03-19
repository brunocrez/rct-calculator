import './styles.css';

export default function Button({ label, double, triple, operation, click }) {

  let classes = 'button ';
  classes += double ? 'double' : '';
  classes += triple ? 'triple' : '';
  classes += operation ? 'operation' : ''

  return (
    <button
      onClick={() => click(label)}
      className={classes}>
        {label}
    </button>
  );
}