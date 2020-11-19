using Clinic.Models;
using Clinic.Repository;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Clinic.Controllers
{
    public class authController : ApiController
    {
        //Dependency Injection by unity. check "DI.UnityResolver.cs"
        readonly IBackendRepository repository;
        public authController(IBackendRepository _repository)
        {
            repository = _repository;
        }
        [HttpPost]
        public LoginResult login([FromBody]LoginRequest request) {
            LoginResult result = new LoginResult();
            if (repository.checkUser(request.userName))
            {
                if (repository.checkPass(request.userName, request.password))
                {
                    AuthInfo info = new AuthInfo { userName = request.userName, Roles = new List<string> { "Admin", "Manage" }, IsAdmin = true };
                    try
                    {
                        const string secret = "easy clinic managemet system";
                        //secret
                        IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
                        IJsonSerializer serializer = new JsonNetSerializer();
                        IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
                        IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);
                        var token = encoder.Encode(info, secret);
                        result.Message = "Login success";
                        result.Token = token;
                        result.Success = true;
                    }
                    catch (Exception ex) {
                        result.Message = ex.Message;
                        result.Success = false;
                    }
                }
                else {
                    result.Message = "wrong password";
                    result.Success = false;
                }
            }
            else {
                result.Message = "Don't find username";
                result.Success = false;
            }

            return result;
        }
    }
}
