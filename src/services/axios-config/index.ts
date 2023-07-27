import axios from 'axios'
import {Environment} from '../../environment/environment'

export const Api = axios.create({
  baseURL: Environment.URL_BASE,
})
