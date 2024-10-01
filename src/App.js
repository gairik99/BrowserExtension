import './App.css';
import { images } from './db/images';
import Home from './pages/Home/Home';
import { useBrowser } from './context/browser-context';
import Task from './pages/Task/Task';
import { useEffect } from 'react';

function App() {
  const index = Math.floor(Math.random() * images.length);
  const bgImage = images[index].image;
  // console.log(bgImage);
  const { name, browserDispatch } = useBrowser();
  // console.log('name-', name);
  useEffect(() => {
    const userName = localStorage.getItem('name');
    browserDispatch({
      type: 'NAME',
      payload: userName
    })
  }, [browserDispatch])


  return (
    <div className="app " style={{ backgroundImage: `url(${bgImage}) ` }}>
      {name ? <Task /> : <Home />}
    </div >
  );
}

export default App;
