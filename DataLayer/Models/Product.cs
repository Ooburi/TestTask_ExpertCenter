using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
