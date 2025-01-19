using System.Security.Cryptography;

namespace Crop.Backend.Helper
{
    public class PasswordHashing
    {
        private const int SaltSize = 16; // 128 bits
        private const int HashSize = 20; // 160 bits
        private const int Iterations = 10000;


        public static string HashPassword(string password)
        {
            // Generate a random salt
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[SaltSize]);

            // Create the hash
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations);
            byte[] hash = pbkdf2.GetBytes(HashSize);

            // Combine the salt and hash
            byte[] hashBytes = new byte[SaltSize + HashSize];
            Array.Copy(salt, 0, hashBytes, 0, SaltSize);
            Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

            // Convert to base64
            string base64Hash = Convert.ToBase64String(hashBytes);

            return base64Hash;
        }

        public static bool VerifyPassword(string password, string hashedPassword)
        {
            // Convert hashed password from base64
            byte[] hashBytes = Convert.FromBase64String(hashedPassword);

            // Extract the salt
            byte[] salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);

            // Compute the hash with the given salt
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations);
            byte[] hash = pbkdf2.GetBytes(HashSize);

            // Compare the hashes
            for (int i = 0; i < HashSize; i++)
            {
                if (hashBytes[i + SaltSize] != hash[i])
                {
                    return false;
                }
            }

            return true;
        }

    }
}
