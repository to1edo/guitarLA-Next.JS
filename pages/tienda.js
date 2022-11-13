import Layout from "../components/layout"
import styles from '../styles/grid.module.css'
import Guitarra from "../components/guitarra"

const tienda = ({guitarras}) => {
  
  return (
    <>
      <Layout title={"Tienda virtual"} description={'Nuestras tienda de guitarras'}>
        <main className="contenedor">
            <h1 className="heading">Nuestra Colección</h1>
            <div className={styles.grid}>
                {guitarras?.map(guitarra => (
                    <Guitarra
                        key={guitarra.id}
                        guitarra={guitarra.attributes}
                    />
                ))}
            </div>
        </main>
      </Layout>
    </>
  )
}

export default tienda

export async function getServerSideProps(){

  const response = await fetch(`${process.env.API_URL}/guitarras/?populate=*`)
  const {data: guitarras} = await response.json()

  return{
      props:{
        guitarras
      }
  }
}

//--- vistas estaticas creadas en el build  ---//

// export async function getStaticProps(){

//   const response = await fetch(`${process.env.API_URL}/guitarras/?populate=*`)
//   const {data: guitarras} = await response.json()

//   return{
//       props:{
//         guitarras
//       }
//   }
// }