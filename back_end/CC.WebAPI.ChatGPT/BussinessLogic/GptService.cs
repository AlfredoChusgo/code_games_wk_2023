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
        }

        public string ReportDatasource { get; set; }

        public async Task<ChatCompletionCreateResponse> GetCompletion(string userMessage)
        {

            return await gpt3.ChatCompletion.CreateCompletion
                                   (new ChatCompletionCreateRequest()
                                   {
                                       // Messages = new List<ChatMessage>(new ChatMessage[]
                                       //{ new ChatMessage("user", userMessage) }),
                                       Messages = GetDefinedMessages(),
                                       Model = Models.ChatGpt3_5Turbo,
                                       Temperature = 0.5F,
                                       MaxTokens = 100,
                                       N = 3
                                   });
        }

        private List<ChatMessage> GetDefinedMessages()
        {
            var systemMessage = "You are a helpful assistant in Data analytics.";
            var userMessage = $"Analyze the following data: {ReportDatasource}";
            
            var definedMessages = new List<ChatMessage>();

            definedMessages.Add(new ChatMessage("system", systemMessage));
            definedMessages.Add(new ChatMessage("user", userMessage));
            
            //definedMessages.Add(new ChatMessage("assistant", userMessage));

            /*
             {"role": "system", "content": "You are a helpful assistant that translates English to French."},
             {"role": "user", "content": 'Translate the following English text to French: "{text}"'}
             */
            return definedMessages;
        }
    }
}
