import axios from 'axios';

const getUserList = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/users');

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getUserList;
