using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Models
{
    public record PriceListRecord(int id, string caption);
    public record ColumnRecord(string name, string type);
    public record PriceListDetailsRecord(string name, IEnumerable<ColumnRecord> columns);
    public record DataRecord(IEnumerable<PriceListRecord> data, int currentPage, int totalPages);
    public record ReceivedRecord(int id, string name, IEnumerable<ColumnRecord> columns);
    public record ProductAttributeRecord(string attributeName, string attributeValue);
    public record ProductRecord(Product product,  IEnumerable<ProductAttributeRecord> attributes);
}
