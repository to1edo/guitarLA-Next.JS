import Image from "next/image"
import { useState } from "react"
import Layout from "../../components/layout"
import styles from "../../styles/guitarras.module.css"
import Swal from 'sweetalert2'

const Guitarra = ({guitarra,agregarCarrito}) => {
  const { nombre, descripcion, imagen, precio} = guitarra.attributes
  const [cantidad, setCantidad] = useState(0)

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(cantidad < 1){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Selecciona una cantidad',
        showConfirmButton: false,
        timer: 1000
      })

      return
    }

    const guitarraSeleccionada = {
      id: guitarra.id,
      nombre,
      imagen: imagen.data.attributes.url,
      precio,
      cantidad
    }

    agregarCarrito(guitarraSeleccionada)

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    })
  }

    return (
        <Layout
            title={`Guitarra ${nombre}`}
        >
            <div className={styles.guitarra}>
                <Image src={imagen.data.attributes.url} width={600} height={400} alt={`Imagen guitarra ${nombre}`} />

                <div className={styles.contenido}>
                    <h3>{nombre}</h3>
                    <p className={styles.descripcion}>{descripcion}</p>
                    <p className={styles.precio}>${precio}</p>

                    <form className={styles.formulario} onSubmit={ handleSubmit }>
                      <label htmlFor="cantidad">Cantidad</label>

                      <select id="cantidad" onChange={(e)=> setCantidad(+e.target.value)} >
                        <option value="">-- Seleccione --</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <input type="submit" value="Agregar al carrito" />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Guitarra

export async function getStaticPaths(){
  const response = await fetch(`${process.env.API_URL}/guitarras`)
  const {data: guitarras} = await response.json()

  const paths = guitarras.map( guitarra =>(
    {
      params: { url: guitarra.attributes.url}
    }
  ))

  return {
    paths,
    fallback: false //return 404 not found automatically
  }
}


export async function getStaticProps({params: {url}}){
  const response = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
  const {data: guitarra} = await response.json()

  return{
      props:{
        guitarra: guitarra[0]
      }
  }
}



//--- server side  ---// 
// export async function getServerSideProps({query: {url}}){
//   const response = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
//   const {data: guitarra} = await response.json()

//   return{
//       props:{
//         guitarra: guitarra[0]
//       }
//   }
// }