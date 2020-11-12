import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import PageNotFound from './components/PageNotFound/PageNotFound';
import ToDo from './components/ToDo/ToDo';
import WordSearch from './components/WordSearch/WordSearch';

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path='/'>
          <WordSearch />
        </Route>

        <Route path='/words'>
          <WordSearch />
        </Route>

        <Route path='/todo'>
          <ToDo />
        </Route>

        <Route path='*'>
          <PageNotFound />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
