using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Crop.Backend.Model
{
    public class Rainfall
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string DistrictName { get;set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public float AverageRainfall { get; set; }
        public float AverageHumidity { get; set; }
        public float AverageTemperature { get; set;}
    }
}
