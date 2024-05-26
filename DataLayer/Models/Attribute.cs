using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Models
{
    public class Attribute
    {
        [Key]
        public int Id { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public string AttributeName { get; set; }
        public string AttributeValue { get; set; }
    }
}
