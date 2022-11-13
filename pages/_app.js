import { useState,useEffect } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
  const [total, setTotal] = useState(0)
  const [carrito, setCarrito] = useState(carritoLS)
  const [ loaded, setLoaded ] = useState(false)

  const agregarCarrito = (guitarra)=>{

    const isNotIncluded = carrito.every( item => item.id !== guitarra.id)

    if(isNotIncluded){
      setCarrito([...carrito, guitarra])
    }else{
      
      const carritoActualizado = carrito.map( item =>{
        if(item.id === guitarra.id){
          item.cantidad = guitarra.cantidad
        }
          return item
      })

      const carritoFiltrado = carritoActualizado.filter( item => item.cantidad>0)
      setCarrito(carritoFiltrado)
    }
  }

  useEffect(() => {
    if(carrito.length){
      
      let acum = carrito.reduce((previo, actual)=>{
        return previo += (actual.precio * actual.cantidad)
      },0)  

      setTotal(acum)
    }else{
      setTotal(0)
    }

    localStorage.setItem('carrito' , JSON.stringify(carrito))
  }, [carrito])


  useEffect( ()=>{
    setLoaded(true)
  },[])

  return loaded ? <Component {...pageProps} 
    agregarCarrito={agregarCarrito}
    carrito={carrito}
    total={total}
  /> :
  null
}

export default MyApp
