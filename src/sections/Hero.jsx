import { useState } from "react";
import { arrowRight } from "../assets/icons";
import { bigShoe1 } from "../assets/images";
import { rose } from "../assets/images";
import Button from "../components/Button";
import ShoeCard from "../components/ShoeCard";
import { statistics, shoes } from "../constants";

const API_KEY = "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";

const Hero = () => {

  const [bigShoeImg, setBigShoeImg] = useState(bigShoe1);
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState(""); // Negative or Positive

  const prompt = "How do I ask out a girl?";

  async function callOpenAIAPI() {
    console.log("Calling OpenAI API");

    const dynamicPrompt = tweet.trim(); // Get the input tweet from the user

    const APIBody = {
      "model": "text-davinci-003",
      "prompt": dynamicPrompt, // Use the user input as the prompt
      "temperature": 0,
      "max_tokens": 300,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0
    };

    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify(APIBody)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      console.log(data);
      setSentiment(data.choices[0].text.trim());
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <section id="home" className="w-full flex xl:flex-row flex-col justify-center min-h-screen 
    gap-10 max-container">

      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28"> 
        <p className="text-xl justify font-playfair z-10 mt-14 ml-4">no rizz? no issue.</p>

          <h1 className='mt-6 font-anton text-[90px] max-sm:text-[72px] max-sm:leading-[82px] font-bold'>
            <span className='xl:bg-white xl:whitespace-nowrap relative z-10 pr-10'>ask your questions on</span>
            <br />
            <span className='text-light-gray inline-block mt-3'>rizz</span> below
          </h1>

          <div className="w-full">
            <div className="">
            <textarea 
              onChange={(e) => setTweet(e.target.value)}
              placeholder='type here...'
              className="font-playfair text-lg leading-20 mt-16 mb-8 w-full border-2 px-4 py-3"
              rows={10}
            />
              <button className="flex justify-center items-center gap-2 px-7 py-4 
                font-anton text-lg leading-none bg-light-gray rounded-full
                text-white border-2" onClick={callOpenAIAPI}>Ask Rizzoto!</button>
                <p className="mt-10 relative font-playfair text-rizzotto text-2xl">
                  {sentiment !== "" &&
                    <h3 className="result">{sentiment}</h3>
                  }
              </p>      
            </div>
          </div>

          <div className="flex justify-starts items-start flex-wrap w-full mt-20 gap-16">
            {statistics.map((stat) =>(
              <div key={stat.label}>
                <p className="text-4xl text-slate-gray font-anton">{stat.value}</p>
                <p className="leading-7 font-playfair">{stat.label}</p>
              </div>
            ))}
          </div>
      </div>


      <div className='relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center'>
        <img
          src={rose}
          alt='shoe colletion'
          width={700}
          height={550}
          className='object-contain relative z-10'
        />


      </div>
    </section>
  )
}

export default Hero