using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Models
{
    public class PriceList
    {
        [Key]
        public int Id { get; set; }
        public string Caption { get; set; }
    }
}
