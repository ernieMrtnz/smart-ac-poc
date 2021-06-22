using System;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace SmartAC.Api.Security
{
    public static class SecurityHelper
    {
        public static string CreatePasswordHash(string password, string salt)
        {
            var passwordBytes = KeyDerivation.Pbkdf2(
                password,
                salt: Encoding.UTF8.GetBytes(salt),
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8);

            return Convert.ToBase64String(passwordBytes);
        }

        public static bool Validate(string password, string salt, string hash) =>
            CreatePasswordHash(password, salt) == hash;

        public static string CreateSalt()
        {
            return CryptSharp.Crypter.Blowfish.GenerateSalt();
        }
    }
}
