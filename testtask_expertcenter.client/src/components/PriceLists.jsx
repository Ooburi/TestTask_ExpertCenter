import {React, useState, useEffect} from 'react'
import Button from './Button'

const priceLists = ({itemClickEvent,productsAction,productsSetPriceListId}) => {
    const [priceListsData, setPriceListsData] = useState();
    const [page, setPage] = useState(0);

    const [seed] = useState(0);
    useEffect(() => {
        populateData();
    }, [page]);

    async function populateData() {
        const response = await fetch('pricelist'+"?page="+page);
        const data = await response.json();
        setPriceListsData(data);
    }

    const rowClick = (rowIndex) =>{
        
        itemClickEvent(rowIndex);
    }

    const lastRow = () => {
        if (priceListsData.totalPages===0) return 'ПустоНажмите +, чтобы добавить прайс-лист'
        if (priceListsData.totalPages < 2) return '';
        return (
            <tr>
                <td colSpan={4} className='bg-slate-500 text-center'>
                    {priceListsData.currentPage > 1 ? <Button callback={() => setPage(page - 1)} caption="❮"/>:''}
                    <span className='font-bold px-[20px]'> {priceListsData.currentPage} of {priceListsData.totalPages}</span>
                    {priceListsData.currentPage < priceListsData.totalPages ? <Button callback={() => setPage(page+1)} caption="❯"/>:''}
                </td>
            </tr>
        )
    }
    async function DeleteElement(index){        
        const rawResponse = await fetch('pricelist'+"?id="+index, {
            method: 'DELETE'
        });
        populateData();
    }
    const rows = () => {
        const rows = priceListsData.data.map((item,index)=>{
            return (
                <tr className='cursor-pointer hover:border-white hover:border-[2px]'
                    >
                    <td 
                        onClick={()=>rowClick(item.id)}
                        className={`px-6 py-3 border-r border-b border-slate-800  ${index%2===0?'bg-slate-600':'bg-slate-700'}` }>
                        {item.id}
                        
                    </td>
                    <td 
                        onClick={()=>rowClick(item.id)}
                        className={`px-6 py-3 border-b border-slate-800 ${index%2===0?'bg-slate-600':'bg-slate-700'}`}>
                        {item.caption}
                    </td>
                    <td className={`${index%2===0?'bg-slate-600':'bg-slate-700'}`}>
                        <Button callback={() =>{
                            productsSetPriceListId(item.id);
                            productsAction();
                        }} caption={"Список товаров"} classNames={"w-full"}/>
                    </td>
                    <td className={`${index%2===0?'bg-slate-600':'bg-slate-700'}`}>
                        <Button callback={()=>{
                            if(window.confirm('Вы уверены?')){
                                console.log(`element n ${item.id} deleted`)
                                DeleteElement(item.id);
                            }
                        }} caption={"Удалить"} classNames={"w-full z-20"}/>
                    </td>
                </tr>
            )
        })
        return rows
    }   

  return (
    <div>
        <table className='min-w-full text-left text-sm font-light text-slate-200'>
            <thead className="border-b border-slate-700 font-medium">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-tl-lg border-r border-slate-700 bg-slate-800">№</th>
              <th scope="col" colSpan={3} className="px-6 py-3 rounded-tr-lg bg-slate-800">Название</th>
            </tr>
          </thead>
          <tbody>
                  {priceListsData === undefined ? '' : rows()}
                  {priceListsData === undefined ? '' : lastRow()}
          </tbody>
        </table>
    </div>
  )
}

export default priceLists