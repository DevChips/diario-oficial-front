import {Api} from '../axios-config'

export interface IListagemTipo {
  _id: string
  label: string
  nome: string
}
export interface IListagemDiario {
  _id: string
  edicao: string
  tipo: string
  dataPublicacao: string
  dataRegistro: string
  ativo: boolean
  arquivo: string
  publicado: boolean
  usuario: string
}
export interface IListagemTipoDiario {
  _id: string
  nome: string
}
export interface IDetalheDiario {
  _id: string
  image64: string
  edicao: string
  dataPublicacao: string
}
export interface IDetalheDiarioTipo {
  _id: string
  descricao: string
}

export interface IFormData {
  image64: string
  tipo: string
  edicao: string
  dataPublicacao: string
}

type TDiarioAll = {
  data: IListagemDiario[]
}

type TTipoDiarioComTotalCount = {
  data: IListagemTipoDiario[]
  totalCount: number
}

const get = async () => {
  const {data} = await Api.get(`/diarios/publicados?limit=1`)
  return data.result[0]
}

export const DiariosService = {
  get,
}
