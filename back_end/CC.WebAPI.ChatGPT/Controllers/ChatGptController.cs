using CC.WebAPI.ChatGPT.BussinessLogic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OpenAI.GPT3;
using OpenAI.GPT3.Managers;
using OpenAI.GPT3.ObjectModels;
using OpenAI.GPT3.ObjectModels.RequestModels;
using System.Reflection;
using System.Text.Json.Nodes;

namespace CC.WebAPI.ChatGPT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[ApiExplorerSettings(IgnoreApi = true)]
    public class ChatGptController : ControllerBase
    {
        private GptService _gptService = new GptService();

        //[HttpGet(Name = "GetChatGPTStatus")]
        //public string GetChatGPTStatus()
        //{
        //    return "Chat is working....";
        //}
        
        //“system”, “user”, or “assistant”

        [HttpGet("{userMessage}", Name = "GetChatResponse")]
        public async Task<string> GetChatResponse(string userMessage)
        {
            string finalMessage = string.Empty;

            // Add user messages.
            //{ "role":"user", "content": "How much the cost of all laptops?"}
           
            _gptService.PreviousMessages = LoadChatMessagesFromJson(userMessage);

            //_gptService.PreviousMessages.Add(_gptService.GetUserMessage(userMessage));

            var completionResult = await _gptService.GetCompletion(userMessage);

            // Check if the completion result was successful and handle the response
            if (completionResult.Successful)
            {
                foreach (var choice in completionResult.Choices)
                {
                    //Console.WriteLine(choice.Message.Content);
                    _gptService.PreviousMessages.Add(_gptService.GetAssistantMessage(choice.Message.Content)); 
                    finalMessage += choice.Message.Content;
                }
            }
            else
            {
                if (completionResult.Error == null)
                {
                    throw new Exception("Unknown Error");
                }
                Console.WriteLine($"{completionResult.Error.Code}: {completionResult.Error.Message}");
            }

            JsonObject  ob= new JsonObject();
            ob.Add("chatgpt_message", finalMessage);

            return   ob.ToJsonString();
        }

        private List<ChatMessage> LoadChatMessagesFromJson(string userMessage)
        {
            return JsonConvert.DeserializeObject<List<ChatMessage>>(userMessage);
        }
    }
}
