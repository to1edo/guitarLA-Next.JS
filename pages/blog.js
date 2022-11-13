import Layout from "../components/layout"
import Post from "../components/post"
import styles from '../styles/grid.module.css'

const blog = ({posts}) => {
  
  return (
    <>
      <Layout title={"Blog"} description={'Nuestros articulos publicados'}>
        <main className="contenedor">
          <h1 className="heading">Blog</h1>
          <div className={styles.grid}>
              {posts?.map(post => (
                  <Post
                    key={post.id}
                    post={post.attributes}
                  />
              ))}
          </div>
        </main>
      </Layout>
    </>
  )
}

export default blog

export async function getStaticProps(){
  const response = await fetch(`${process.env.API_URL}/posts?populate=*`)
  const {data: posts} = await response.json()

  return{
      props:{
        posts
      }
  }
}