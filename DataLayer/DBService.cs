using DataLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataLayer
{
    public class DBService : IDBService
    {
        DBContext _context;
        public DBService(DBContext context)
        {
            _context = context;
        }

        public void Dispose()
        {
            try
            {
                _context.Dispose();
            }
            catch { }
        }

        public async Task<int> CountPriceListsAsync()
        {
            return await _context.PriceLists.CountAsync();
        }
        public async Task<IEnumerable<PriceList>> GetPriceListsAsync(int numberToSkip, int numberToTake)
        {
            return await _context.PriceLists.Skip(numberToSkip).Take(numberToTake).ToListAsync();
        }

        public async Task<PriceList> GetPriceListAsync(int id)
        {
            return await _context.PriceLists.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<PriceListAttribute>> GetPriceListAttributeListAsync(int id)
        {
            return await _context.PriceListAttributes.Where(p => p.PriceListId == id).ToListAsync();
        }

        public async Task AddPriceListWithAllAttributes(ReceivedRecord data)
        {
            List<PriceListAttribute> attributes = new List<PriceListAttribute>();
            PriceList pricelist = new PriceList() { Caption = data.name };

            if (data.id != 0)
            {
                pricelist = await _context.PriceLists.FirstOrDefaultAsync(p => p.Id == data.id);
                pricelist.Caption = data.name;

                var oldAttributes = _context.PriceListAttributes.Where(a => a.PriceListId == data.id).ToList();
                _context.PriceListAttributes.RemoveRange(oldAttributes);
                await _context.SaveChangesAsync();
            }
            else if (!data.columns.Any())
            {
                await _context.PriceLists.AddAsync(pricelist);
                await _context.SaveChangesAsync();
            }


            foreach (var item in data.columns)
            {
                attributes.Add(new PriceListAttribute()
                {
                    PriceList = pricelist,
                    Name = item.name,
                    Type = item.type
                });
            }
            await _context.PriceListAttributes.AddRangeAsync(attributes);
            await _context.SaveChangesAsync();
        }
        public async Task RemovePriceList(int id)
        {
            var priceListsAttributes = await _context.PriceListAttributes.Where(a => a.PriceListId == id).ToListAsync();
            var priceList = await _context.PriceLists.FirstOrDefaultAsync(a => a.Id == id);

            _context.PriceListAttributes.RemoveRange(priceListsAttributes);
            _context.PriceLists.Remove(priceList);
            _context.SaveChanges();
        }

        public async Task<IEnumerable<ProductRecord>> GetProductsAsync(int priceListId)
        {
            var products = await _context.Products
                .Where(p => p.PriceListId == priceListId)
                .Include(p => p.Attributes)
                .Select(p => new ProductRecord(
                        p,
                        p.Attributes.Select(a => new ProductAttributeRecord(a.AttributeName, a.AttributeValue))
                        )).ToListAsync();

            return products;
        }
        public async Task<IEnumerable<string>> GetPriceListHeadersAsync(int priceListId)
        {
            return await _context.PriceListAttributes.Where(a => a.PriceListId == priceListId).Select(i => i.Name).ToListAsync();
        }
    }
}
