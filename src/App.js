import './App.css';
import Head from './components/Head';
import Body from './components/Body';
import { Provider } from 'react-redux';
import  store  from './utils/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainCounter from './components/MainCounter';
import WatchPage from './components/WatchPage';


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
