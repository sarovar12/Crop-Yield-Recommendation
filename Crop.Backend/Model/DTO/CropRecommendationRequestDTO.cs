namespace Crop.Backend.Model.DTO;

public class CropRecommendationRequestDTO
{
    public float Nitrogen { get; set; }
    public float Potassium { get; set; }
    public float Phosphorus { get; set; }
    public float Temperature { get; set; }
    public float Humidity { get; set; }
    public float PhValue { get; set; }
    public float Rainfall { get; set; }

}
