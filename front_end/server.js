import { Configuration, OpenAIApi } from "openai";
import  express from "express";
import bodyParser from "body-parser";
import cors from "cors" ;

const configuration = new Configuration({
    organization: "org-1JQJRSkh0z2nPDbR0bIWBr4r",
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);


const app = express();
const port =  3000;



app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req,res)=>{
    const {messages}  = req.body;
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "you are helpful assitant in data analysts" },
        ...messages],
    });

    res.json({completion: completion.data.choices[0].message});
});

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});