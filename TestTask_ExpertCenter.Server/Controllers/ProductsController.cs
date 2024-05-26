using DataLayer;
using DataLayer.Models;
using Microsoft.AspNetCore.Mvc;
using static DataLayer.DBService;

namespace TestTask_ExpertCenter.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IDBService _db;
        public ProductsController(IDBService db)
        {
            _db = db;
        }
        public record ProductsRecord(IEnumerable<string> headers, IEnumerable<ProductRecord> products);
        [HttpGet]
        public async Task<ProductsRecord> GetAsync(int priceListId)
        {
            return new ProductsRecord(await _db.GetPriceListHeadersAsync(priceListId), await _db.GetProductsAsync(priceListId));
        }
    }
}

    
