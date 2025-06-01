import './App.css'
import AppRoutes from './routes/AppRoutes'

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';



import { PrimeReactProvider } from 'primereact/api';
function App() {
  return (
    <PrimeReactProvider>
      <AppRoutes />
    </PrimeReactProvider>
    

   
  )
}

export default App
 
