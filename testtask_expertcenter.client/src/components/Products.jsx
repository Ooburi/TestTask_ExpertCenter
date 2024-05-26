import React from 'react'

import Button from './Button';

const Products = () => {
    return (
        <div className='text-left'>
            <Button caption={"Добавить"}/>
            <table className='min-w-full text-left text-sm font-light text-slate-200'>
                <thead className="border-b border-slate-700 font-medium">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-tl-lg border-r border-slate-700 bg-slate-800">№</th>
                  <th scope="col" colSpan={3} className="px-6 py-3 rounded-tr-lg bg-slate-800">Название</th>
                </tr>
              </thead>
              <tbody>
                      
              </tbody>
            </table>
        </div>
      )
}

export default Products