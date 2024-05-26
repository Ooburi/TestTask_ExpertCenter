import {React,useState, useEffect} from 'react'

import Button from './Button'

const EditPriceList = ({priceListId, backAction}) => {
    const [name,setName] = useState();
    const [validName,setValidName] = useState(false);
    const [validColumns,setValidColumns] = useState(false);
    const [trySubmit,setTrySubmit] = useState(false);

    const [columns,setColumns] = useState([]);

    async function populateData() {
        if(priceListId>0) {
            const response = await fetch('pricelist/getone/'+priceListId);
            const data = await response.json();
            setColumns(data.columns);
            setName(data.name);
        }
    }
    async function sendData() {        
        let listinfo = {
            id: priceListId,
            name: name,
            columns: columns
        }
        const rawResponse = await fetch('pricelist', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listinfo)
        });
        const content = await rawResponse.json();
    }
    useEffect(() => {
        populateData();
    }, []);
    
    const checkValid = () => {
        let result = true;

        if (name) setValidName(true);
        else {
            setValidName(false);
            result = false;
        };

        setValidColumns(validColumns=>true);
        if(columns.some(e=>!e.name)) {
            setValidColumns(validColumns => false);
            result = false;
        }

        return result;
    }
    const removeColumn = (index) => {
        setColumns((columns)=>([...columns.slice(0,index),...columns.slice(index+1)]))
    }
    const addColumn = () => {
        setColumns((columns)=>([...columns, {name:'',type:'number'}]))
    }
    const editColumnsName =(index) =>(e) => {
        setColumns((columns)=>([...columns.slice(0,index),{name:e.target.value,type:columns[index].type},...columns.slice(index+1)]))
    }
    const editColumnsValue =(index) =>(e) => {
        setColumns((columns)=>([...columns.slice(0,index),{name:columns[index].name,type:e.target.value},...columns.slice(index+1)]))
    }
    const editName = (e) => {
        setName(e.target.value);
    }
    const drawRows = () => {
        return columns.map((item,index)=>{
            return (
                <tr key={Math.random()}>
                    <td className='p-0 m-0'>
                        <input
                            onBlur={editColumnsName(index)}
                            type="text"
                            maxLength={30}
                            defaultValue={item.name}
                            className='w-full p-2 bg-slate-800 border-l-[1px] border-b-[1px] border-slate-400'
                            text-black
                         />
                    </td>
                    <td className='p-0 m-0'>
                    <select 
                            onBlur={editColumnsValue(index)}
                            name="type" defaultValue={item.type}  
                            className='w-full p-2 bg-slate-800 border-l-[1px] border-b-[1px] border-slate-400 cursor-pointer'>
                        <option value="number">Число</option>
                        <option value="text">Текст</option>                        
                    </select>
                    </td>
                    <td className='m-0 p-0 text-center bg-slate-800 '>
                        <Button 
                            caption={"Удалить"} 
                            classNames={"border-1 rounded-lg border-slate-100 bg-red-950 w-full"}
                            callback={()=>{removeColumn(index)}}
                            />
                            
                    </td>
                </tr>
            )
        })
    }
    const table = () => {
        if(columns.length===0) return '';
        return (
            <table className='w-[90%] text-left text-sm font-light text-slate-200 ml-10 border-none'>
                <thead className="font-medium">
                    <tr>
                        <th scope="col" className="rounded-tl-lg border-r-2  bg-slate-900 text-white w-[50%]">Название свойства</th>
                        <th scope="col" colSpan={2} className="rounded-tr-lg  bg-slate-900 text-white">Тип свойства</th>
                    </tr>
                </thead>
                <tbody>
                    {drawRows()}
                </tbody>
            </table>
        )
    }
    
    const submit = () => {
        setTrySubmit(true);
        const valid = checkValid();

        if (valid) {
            sendData();
            backAction();
        }
    }
  return (
    <div className="relative mt-4 min-h-[100px] w-[800px] rounded-xl bg-slate-800">
        <h2 className='p-2 px-10 text-left text-blue-200 uppercase'>Добавление прайс-листа</h2>
        <div className='flex text-left mx-10 p-0'>
            <Button 
                caption={'Сохранить'}
                callback={()=>submit()}
                classNames={"text-black bg-green-100"}/>
            <Button caption={'Отменить'} classNames={"text-black bg-red-100"} callback={()=>backAction()}/>
        </div>
        {trySubmit?(
           <div> 
            {
                validName?'':(
                    <h4 className='text-red-500'> * нужно задать название</h4>
                )
            }
            {
                validColumns?'':(
                    <h4 className='text-red-500'> * все свойства должны иметь название</h4>
                )
            }
           </div>
        ):''}
        <h3 className='p-2 px-10 text-left text-blue-200'>Название:</h3>
        <input 
            type="text"
            value={name}
            onChange={editName}
            placeholder='Введите название прайс-листа' 
            maxLength={50} 
            className='w-[90%] mx-10 px-4 rounded-md bg-slate-600'/>

        <div className='flex text-left mx-10 p-0'>
            <Button 
                callback={()=>addColumn()}
                caption={'Добавить свойство'} 
                classNames={"w-[200px] text-black bg-slate-400 mt-5"}/>
        </div>
            {table()}
    </div>
  )
}

export default EditPriceList