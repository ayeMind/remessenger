import axios from 'axios';

const getMessages = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/chat');

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getMessages;
