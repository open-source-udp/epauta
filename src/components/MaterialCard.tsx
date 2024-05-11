import {
  Card,
  CardHeader
} from './ui/card'

import './MaterialCard.css'

interface Props {
  nombre: string
  codigo: string
  publicUrl: string
}

export default function MaterialCard ({ nombre, codigo, publicUrl }: Props) {
  return (
		<a href={publicUrl} ><Card style={{
		  backgroundColor: '#f3f3f3',
		  borderRadius: '0.5rem'
		}}>
			<CardHeader className='nombre' style={{
			  fontSize: '15px',
			  textTransform: 'uppercase'
			}}>{nombre}</CardHeader>
		</Card></a>
  )
}
