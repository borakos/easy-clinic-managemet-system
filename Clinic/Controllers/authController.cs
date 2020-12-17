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
using System.Web.Http.Cors;

namespace Clinic.Controllers
{
	[EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
	public class authController : ApiController
    {
        //Dependency Injection by unity. check "DI.UnityResolver.cs"
        readonly IBackendRepository repository;
        public authController(IBackendRepository _repository)
        {
            repository = _repository;
        }
        [HttpPost]
		public IHttpActionResult login([FromBody] LoginRequest request)
		{
			try
			{
				if ((request != null) && repository.checkUser(request.userName))
				{
					if (repository.checkPass(request.userName, request.password))
					{
						AuthInfo info = new AuthInfo { userName = request.userName, role = "admin", id = "1" };
						const string secret = "easy clinic managemet system";
						IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
						IJsonSerializer serializer = new JsonNetSerializer();
						IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
						IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);
						var token = encoder.Encode(info, secret);
						return Ok(token);
					}
					else
					{
						return Content(HttpStatusCode.Unauthorized, "Password or username is not correct");
					}
				}
				else
				{
					return Content(HttpStatusCode.Unauthorized, "User cannot be found.");
				}
				} catch (Exception exc)
			{
				return Content(HttpStatusCode.InternalServerError, exc.Message);
			}
		}
	}
}
