import Image from "next/image"
import Layout from "../../components/layout"
import { formatearFecha } from '../../utils/helpers'
import styles from '../../styles/blog.module.css'

export function PostUrl({post}) {
    const { titulo,contenido, imagen, publishedAt} = post.attributes

    return (
        <Layout
            title={titulo}
        >
            <article className={`${styles.post} ${styles['mt-3']}`}>
                <Image src={imagen.data.attributes.url} width={1000} height={600} alt={`imagen blog ${titulo}`} />

                <div className={styles.contenido}>
                    <h3>{titulo}</h3>
                    <p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
                    <p className={styles.texto}>{contenido}</p>
                </div>
            </article>
        </Layout>
    )
}


export default PostUrl

//server side rendering
export async function getServerSideProps(datos){
  const url = datos.query.url
  const response = await fetch(`${process.env.API_URL}/posts?filters[url]=${url}&populate=*`)
  const {data: post} = await response.json()
  
  return{
      props:{
        post: post[0]
      }
  }
}


//  Static Side Generation
// export async function getStaticPaths(){
//   const response = await fetch(`${process.env.API_URL}/posts?populate=*`)
//   const {data: posts} = await response.json()

//   const paths = posts.map(post =>{
//     return{
//       params:{ url: post.attributes.url}
//     }
//   })

//   return{
//     paths,
//     fallback: false
//   }
// }

// export async function getStaticProps({params}){
//   const response = await fetch(`${process.env.API_URL}/posts?filters[url]=${params.url}&populate=*`)
//   const {data: post} = await response.json()
  
//   return{
//       props:{
//         post: post[0]
//       }
//   }
// }