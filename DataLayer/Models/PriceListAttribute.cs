using System.ComponentModel.DataAnnotations;

namespace DataLayer.Models
{
    public class PriceListAttribute
    {
        [Key]
        public int Id { get; set; }
        //table headers
        public PriceList PriceList { get; set; }
        public int PriceListId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
    }
}
