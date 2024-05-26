using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
