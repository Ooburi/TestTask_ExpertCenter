using System.ComponentModel.DataAnnotations;

namespace DataLayer.Models
{
    public class PriceList
    {
        [Key]
        public int Id { get; set; }
        public string Caption { get; set; }
    }
}
