import {
  Card,
  CardHeader
} from './ui/card'

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
			<CardHeader style={{
			  fontSize: '15px',
			  textTransform: 'uppercase',
			  fontWeight: 'bold'
			}}>{nombre}</CardHeader>
		</Card></a>
  )
}
