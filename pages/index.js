import Layout from '../components/layout'
import Guitarra from '../components/guitarra'
import Post from '../components/post'
import styles from '../styles/grid.module.css'
import Curso from '../components/curso'

export default function Home({posts,guitarras, curso}) {
  // console.log({posts, guitarras})
  return (
    <>
      <Layout title={"Inicio"} description={'Tienda virtual de guitarras'}>
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

        <Curso
          curso={curso.attributes}
        />

        <section className="contenedor">
          <h1 className="heading">Blog</h1>
          <div className={styles.grid}>
              {posts?.map(post => (
                  <Post
                    key={post.id}
                    post={post.attributes}
                  />
              ))}
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getServerSideProps(){

  const [resPosts, resGuitarras, resCurso] = await Promise.all([
    fetch(`${process.env.API_URL}/posts?populate=*`),
    fetch(`${process.env.API_URL}/guitarras/?populate=*`),
    fetch(`${process.env.API_URL}/curso/?populate=*`)
  ])
  
  const [{data: posts}, {data: guitarras}, {data: curso}] = await Promise.all([resPosts.json(), resGuitarras.json(), resCurso.json()])

  return{
      props:{
        posts,
        guitarras,
        curso
      }
  }
}