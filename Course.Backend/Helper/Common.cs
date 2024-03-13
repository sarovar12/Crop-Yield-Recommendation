namespace Course.Backend.Helper
{
    public class Common
    {
        public class ServiceResult
        {
            public bool Succeed { get; set; } = true;
            public string? Data { get; set; }
            public string Error { get; set; } = null;

        }
       
    }
}
