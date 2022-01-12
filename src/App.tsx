import Exchange from './features/exchange/Exchange';
import css from './App.module.scss';
const App = () => {
  return (
    <div className={css.root}>
      <Exchange />
    </div>
  );
};

export default App;
