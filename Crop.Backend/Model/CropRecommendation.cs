using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Crop.Backend.Model
{
    public class CropRecommendation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public float? Latitude { get; set; }
        public float? Longitude { get; set; }
        public float Rainfall { get; set; }
        public float Humidity { get; set; }
        public float Temperature { get; set; }
        public float Nitrogen { get; set; }
        public float Phosphorus { get; set; }
        public float Potassium { get; set; }
        public float PhValue { get; set; }
        public string Recommendation { get; set; }
    }
}
