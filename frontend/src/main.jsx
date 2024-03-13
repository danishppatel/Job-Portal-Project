import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router/Router.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './Store.js'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


// import ReactDOM from 'react-dom/client'
// import './index.css'
// import { RouterProvider } from 'react-router-dom'
// import router from './Router/Router.jsx'
// import { Provider } from 'react-redux'
// import { persistor, store } from './Store.js'
// import { PersistGate } from 'redux-persist/integration/react'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//          <RouterProvider router={router}/>
//     </PersistGate>
//   </Provider>
  
// )

