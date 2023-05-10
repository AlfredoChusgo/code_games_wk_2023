using OpenAI.GPT3.ObjectModels.RequestModels;
using OpenAI.GPT3.ObjectModels;
using OpenAI.GPT3.ObjectModels.ResponseModels;
using OpenAI.GPT3.Managers;
using OpenAI.GPT3;

namespace CC.WebAPI.ChatGPT.BussinessLogic
{
    public class GptService
    {
        const string API_KEY = "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";

        OpenAIService gpt3;

        public GptService()
        {
            // Create an instance of the OpenAIService class
            gpt3 = new OpenAIService(new OpenAiOptions()
            {
                ApiKey = API_KEY
            });

            ReportDatasource = $"{{\r\n  \"id\": 10,\r\n  \"title\": \"HP Pavilion 15-DK1056WM\",\r\n  \"description\": \"HP Pavilion 15-DK1056WM Gaming...\",\r\n  \"price\": 123,\r\n  \"discountPercentage\": 6.18,\r\n  \"rating\": 4.43,\r\n  \"stock\": 89,\r\n  \"brand\": \"HP Pavilion\",\r\n  \"category\": \"laptops\",\r\n  \"thumbnail\": \"https://i.dummyjson.com/data/products/10/thumbnail.jpeg\"\r\n}}{{\r\n  \"id\": 13,\r\n  \"title\": \"HP Pavilion 13-DK1056WM\",\r\n  \"description\": \"HP Pavilion 15-DK1056WM Gaming...\",\r\n  \"price\": 999,\r\n  \"discountPercentage\": 6.18,\r\n  \"rating\": 4.43,\r\n  \"stock\": 89,\r\n  \"brand\": \"HP Pavilion\",\r\n  \"category\": \"laptops\",\r\n  \"thumbnail\": \"https://i.dummyjson.com/data/products/10/thumbnail.jpeg\"\r\n}}{{\r\n  \"id\": 12,\r\n  \"title\": \"HP Pavilion 15-DK1046WM\",\r\n  \"description\": \"HP Pavilion 15-DK1056WM Gaming...\",\r\n  \"price\": 1099,\r\n  \"discountPercentage\": 6.18,\r\n  \"rating\": 4.43,\r\n  \"stock\": 89,\r\n  \"brand\": \"HP Pavilion\",\r\n  \"category\": \"laptops 2\",\r\n  \"thumbnail\": \"https://i.dummyjson.com/data/products/10/thumbnail.jpeg\"\r\n}}{{\r\n  \"id\": 11,\r\n  \"title\": \"HP Pavilion 18-DK1056WM\",\r\n  \"description\": \"HP Pavilion 15-DK1056WM Gaming...\",\r\n  \"price\": 1111,\r\n  \"discountPercentage\": 6.18,\r\n  \"rating\": 4.43,\r\n  \"stock\": 89,\r\n  \"brand\": \"HP Pavilion\",\r\n  \"category\": \"laptops 2\",\r\n  \"thumbnail\": \"https://i.dummyjson.com/data/products/10/thumbnail.jpeg\"\r\n}}";
        }

        public string ReportDatasource { get; set; }

        public List<ChatMessage> PreviousMessages { get; set; }

        //public string PreviousMessages { get; set; }

        public async Task<ChatCompletionCreateResponse> GetCompletion(string userMessage)
        {

            return await gpt3.ChatCompletion.CreateCompletion
                                   (new ChatCompletionCreateRequest()
                                   {
                                       // Messages = new List<ChatMessage>(new ChatMessage[]
                                       //{ new ChatMessage("user", userMessage) }),
                                       Messages = GetChatMessages(),
                                       Model = Models.ChatGpt3_5Turbo,
                                       Temperature = 0.5F,
                                       MaxTokens = 100,
                                       N = 1
                                   });
        }


        private List<ChatMessage> GetChatMessages()
        {
            var messages = new List<ChatMessage>();

            messages.Add(GetSystemMessage());
            messages.AddRange(PreviousMessages);

            return messages;
        }

        private List<ChatMessage> GetMessages() 
        { 
            var messages = new List<ChatMessage>();

            messages.Add(GetSystemMessage());
            messages.Add(GetUserMessage($"{ReportDatasource}"));



            return messages;
        }

        internal ChatMessage GetSystemMessage()
        {
            var systemMessage = "You are a helpful assistant in Data analysts.";

            return new ChatMessage("system", systemMessage);
        }

        internal ChatMessage GetUserMessage(string userMessage) 
        {
            return new ChatMessage("user", userMessage);
        }

        internal ChatMessage GetAssistantMessage(string assistantMessage)
        {
            return new ChatMessage("assistant", assistantMessage);
        }

        private List<ChatMessage> GetDefaultMessages()
        {
            var systemMessage = "You are a helpful assistant in Data analytics.";

            var userMessage = $"Analyze the following data: {ReportDatasource}";
            
            var definedMessages = new List<ChatMessage>();

            definedMessages.Add(new ChatMessage("system", systemMessage));
            definedMessages.Add(new ChatMessage("user", userMessage));
            
            //definedMessages.Add(new ChatMessage("assistant", userMessage));
           
            return definedMessages;
        }
    }
}
