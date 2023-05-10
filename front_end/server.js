import { Configuration, OpenAIApi } from "openai";
import  express from "express";
import bodyParser from "body-parser";
import cors from "cors" ;
import 'dotenv/config';

const port =  process.env.PORT;
const apiKey = process.env.API_KEY;
const organizationId = process.env.ORGANIZATION_ID;

const configuration = new Configuration({
    organization: organizationId,
    apiKey: apiKey
});

const openai = new OpenAIApi(configuration);


const app = express();



app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req,res)=>{
    try {
        const { messages } = req.body;
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "you are helpful assitant in data analysts" },
                ...messages],
        });

    res.json({completion: completion.data.choices[0].message});
        // Code that may throw an exception
      } catch (error) {
        // Code to handle the exception
        res.json({error: JSON.stringify(error)});
      }
      
});

app.listen(port,()=>{
    console.log(`Example app listening at port: ${port}`);
});