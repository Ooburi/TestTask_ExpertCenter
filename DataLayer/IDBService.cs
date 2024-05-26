using DataLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DataLayer.DBService;


namespace DataLayer
{
    public interface IDBService
    {
        public void Dispose();

        public Task<int> CountPriceListsAsync();
        public Task<IEnumerable<PriceList>> GetPriceListsAsync(int numberToSkip, int numberToTake);

        public Task<PriceList> GetPriceListAsync(int id);
        public Task<IEnumerable<PriceListAttribute>> GetPriceListAttributeListAsync(int id);

        public Task AddPriceListWithAllAttributes(ReceivedRecord data);
        public Task RemovePriceList(int id);

        public Task<IEnumerable<ProductRecord>> GetProductsAsync(int priceListId);
        public Task<IEnumerable<string>> GetPriceListHeadersAsync(int priceListId);
    }
}
