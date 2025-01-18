import './App.css';
import Head from './components/Head';
import Body from './components/Body';
import { Provider } from 'react-redux';
import  store  from './utils/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainCounter from './components/MainCounter';
import WatchPage from './components/WatchPage';
import ShortsPage from './components/ShortsPage';


const appRouter =createBrowserRouter ([{
  path:"/",
  element:<Body/>,

  children:[
    {
      path:"/",
      element:<MainCounter/>
    },

    {
      path:"watch",
      element:<WatchPage/>
    },

    {
      path:"Short",
      element:<ShortsPage/>
    },

    

  ]
}])



function App() {
  return (

    <Provider store={store} > 
    <div>
    

                          {/* head
                          Body
                            sidebar
                          MainItemc 
                          
                          
                          */}
        <Head/>
        <RouterProvider router={appRouter} />
        {/* <Body/> */}


      
    </div>

    </Provider>
  

  );
}

export default App;
