import { useEffect, useState } from 'react';
import './App.css';

import PriceLists from './components/PriceLists';
import Header from './components/Header';
import Button from './components/Button'
import EditPriceList from './components/EditPriceList';
import Products from './components/Products';

function App() {
    //stages:
    // all - pricelists list
    // editpl - edit price list
    // products

    const [stage, setStage] = useState('all');
    const [priceListId,setPriceListId] = useState(0);

    const priceListClicked = (id)=>{
        setPriceListId(id);
        setStage('editpl');
    }
    
     
    const content = () => {
        switch(stage){
            case 'products': return (
                <div>
                    <div className='flex flex-row justify-between text-left text-blue-300 font-bold pl-[20px]'>
                        <span>Продукты из прайс-листа "{priceListId}"</span>
                        <Button caption="Назад" callback={() => {
                            setPriceListId(0);
                            setStage('all');
                        }} />
                        
                    </div>
                    <Products priceListId={priceListId}/>
                </div>
            )
            case 'all': return (
                <div>
                    <div className='flex flex-row justify-between text-left text-blue-300 font-bold pl-[20px]'>
                        <span>Прайс-листы</span>
                        <Button caption="+" callback={() => priceListClicked(0)} />
                    </div>
                    <PriceLists itemClickEvent={priceListClicked} productsSetPriceListId={setPriceListId} productsAction={()=>setStage('products')}/> 
                </div>
            )
            case 'editpl': return(
                <EditPriceList 
                    backAction={()=>setStage('all')}
                    priceListId={priceListId}
                    />
            )
        }
    }
    return (
        <div>
        <Header/>
        {content()}
        </div>
    );
}

// function App() {
//     const [forecasts, setForecasts] = useState();

//     useEffect(() => {
//         populateWeatherData();
//     }, []);

//     const contents = forecasts === undefined
//         ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
//         : <table className="table table-striped" aria-labelledby="tabelLabel">
//             <thead>
//                 <tr>
//                     <th>Date</th>
//                     <th>Temp. (C)</th>
//                     <th>Temp. (F)</th>
//                     <th>Summary</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {forecasts.map(forecast =>
//                     <tr key={forecast.date}>
//                         <td>{forecast.date}</td>
//                         <td>{forecast.temperatureC}</td>
//                         <td>{forecast.temperatureF}</td>
//                         <td>{forecast.summary}</td>
//                     </tr>
//                 )}
//             </tbody>
//         </table>;

//     return (
//         <div>
//             <h1 id="tabelLabel">Weather forecast</h1>
//             <p>This component demonstrates fetching data from the server.</p>
//             {contents}
//         </div>
//     );
    
//     async function populateWeatherData() {
//         const response = await fetch('weatherforecast');
//         const data = await response.json();
//         setForecasts(data);
//     }
// }

export default App;