import axios from 'axios';
import { User } from '../interfaces';

const getUserList = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/users');

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getUserList;
