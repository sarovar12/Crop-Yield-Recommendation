using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Crop.Backend.Filters
{
    public class ArgumentExceptionHandler : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            // Check if the exception is of type ArgumentException
            if (context.Exception is ArgumentException argumentException)
            {
                // Create a custom response for the ArgumentException
                var details = new
                {
                    Message = argumentException.Message
                };

                // Set the result to indicate a bad request
                context.Result = new BadRequestObjectResult(details);

                // Mark the exception as handled
                context.ExceptionHandled = true;
            }
        }
    }
}
