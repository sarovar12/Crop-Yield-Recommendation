using Newtonsoft.Json;

namespace Crop.Backend.Model.DTO;

public class SoilDataRequestModel
{
    public float Latitude { get; set; }
    public float Longitude { get; set; }
}


public class NarcResponseModel
{
    [JsonProperty("coord")]
    public Coord Coord { get; set; }
    public string ParentSoil { get; set; }
    public float Ph { get; set; }
    public string Clay { get; set; }

    [JsonProperty("organic_matter")]
    public string OrganicMatter { get; set; }

    [JsonProperty("total_nitrogen")]
    public string TotalNitrogen { get; set; }
    public string Boron { get; set; }
    public string P2O5 { get; set; }
    public string Sand { get; set; }
    public string Zinc { get; set; }
    public string Potassium { get; set; }

    [JsonProperty("result")]
    public string Result {  get; set; }
}

public class SoilDataResponseModel
{
    //public Coord Coord { get; set; }
    public string ParentSoil { get; set; }
    public float Ph { get; set; }
    public string Clay { get; set; }
    public string OrganicMatter { get; set; }
    public string TotalNitrogen { get; set; }
    public string Boron { get; set; }
    public string P2O5 { get; set; }
    public string Sand { get; set; }
    public string Zinc { get; set; }
    public string Potassium { get; set; }
}

public class Coord
{
    public double Lon { get; set; }
    public double Lat { get; set; }
}

