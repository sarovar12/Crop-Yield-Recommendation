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

public class CropRecommendationByLocationRequestDTO
{
    public float Latitude { get; set; }
    public float Longitude { get; set; }
}

public class CropRecommendationByLocationResponseDTO
{
    public string RandomForest { get; set; }
    public string GradientBoosting { get; set; }
    public string Nitrogen { get; set; }
    public string Phosphorus { get; set; }
    public string Potassium { get; set; }
    public float PhValue { get; set; }
}
