import OpenAI from 'openai';
import { OPENAI_KEY } from './constant';
//import { OPENAI_KEY } from './constant';
const openai = new OpenAI({
  apiKey: 'put your openai key to run this gpt feature',
  //apiKey:process.env.REACT_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});
export default openai;