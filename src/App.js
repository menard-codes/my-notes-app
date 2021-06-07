import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

// PAGES
import Auth from './pages/Auth.page';
import MainApp from './pages/MainApp.page';
import ErrorPage from './pages/Error.page';
import TOS from './pages/TOS.pages';
import Privacy from './pages/Privacy.pages';

// FIREBASE
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// FIREBASE HOOKS
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseConfig } from './FirebaseApp.config';

firebase.initializeApp(firebaseConfig);


// TODO: HAVE A DEDICATED ERROR COMPONENT FOR CALLBACK ERRORS

function App() {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const [user, loading, error] = useAuthState(auth);

  // in case of an error, the app will just render the erorr page
  if (error) return <ErrorPage errorMessage={error} />;

  // other components
  const loadingComponent = <h1>Loading...</h1>

  return (
    <Router>
      <Switch>
        <Route path="/" exact render={
          () => loading ? loadingComponent : user ? <MainApp auth={auth} firestore={firestore} user={user} /> : <Redirect to="/signin" />
        } />
        <Route path="/signin" render={
          () => loading ? loadingComponent : user ? <Redirect to="/" /> : <Auth auth={auth} firebase={firebase} />
        } />
        <Route path="/terms-of-service" component={TOS} />
        <Route path="/privacy" component={Privacy} />
        <Route render={() => <ErrorPage errorMessage={'404 Error'} />} />
      </Switch>
    </Router>
  );
}

export default App;
