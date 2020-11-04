import App from './src/App';

if (__DEV__) { import('./ReactotronConfig').finally(() => { console.log('Reactotron Configured'); }); }

export default App;
