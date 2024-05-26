using System.ComponentModel.DataAnnotations;

namespace DataLayer.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public PriceList PriceList { get; set; }
        public int PriceListId { get; set; }
        public ICollection<Attribute> Attributes { get; set; }
    }
}
