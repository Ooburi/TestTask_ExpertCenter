using DataLayer;
using DataLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace TestTask_ExpertCenter.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PriceListController : ControllerBase
    {

        private readonly IDBService _db;
        private const int recordsPerPage = 10;
        public PriceListController(IDBService db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<DataRecord> GetAsync(int page)
        {
            var count = await _db.CountPriceListsAsync();
            int countTotalPages = count / recordsPerPage;
            countTotalPages = count % recordsPerPage > 0 ? countTotalPages + 1 : countTotalPages;

            return new(
                    (await _db.GetPriceListsAsync(page * recordsPerPage, recordsPerPage)).
                    Select(i => new PriceListRecord(i.Id, i.Caption)),
                    page + 1, countTotalPages
                );
        }
        [HttpGet("getone/{id}")]
        public async Task<PriceListDetailsRecord> GetOneAsync(int id)
        {
            var list = await _db.GetPriceListAsync(id);
            var attributes = await _db.GetPriceListAttributeListAsync(id);
            return new PriceListDetailsRecord(list.Caption, attributes.Select(i => new ColumnRecord(i.Name, i.Type)));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] ReceivedRecord data)
        {
            await _db.AddPriceListWithAllAttributes(data);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            await _db.RemovePriceList(id);
            return Ok();
        }


    }
}
