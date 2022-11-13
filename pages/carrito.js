import Layout from "../components/layout"
import styles from '../styles/carrito.module.css'
import Image from "next/image"
import Swal from 'sweetalert2'

const Carrito = ({carrito,agregarCarrito, total}) => {

  const cambiarCantidad= (guitarra, cantidad)=>{
    if(cantidad<=5 && cantidad >0){
      guitarra.cantidad = cantidad;
      agregarCarrito(guitarra)
    }
  }

  const eliminarGuitarra = (guitarra)=>{

    Swal.fire({
      title: 'Deseas eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(48, 133, 214)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        guitarra.cantidad = 0
        agregarCarrito(guitarra)

        Swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado del carrito',
          'success'
        )
      }
    })
  }


  return (

    <Layout title="Carrito de compras">
      <main className="contenedor">
        <h1 className="heading">Lista de compra</h1>

        <div className={styles.contenido}>
          <div className={styles.carrito}>
            <h3>Articulos</h3>

            {carrito?.length  ?
              ( 
                carrito.map( guitarra =>{
                return(
                  <div key={guitarra.id} className={styles.producto}>
                    <div>
                      <Image src={guitarra.imagen} alt={`imagen guitar ${guitarra.nombre}`} width={250} height={480}/>
                    </div>

                    <div>
                      <p className={styles.nombre}>{guitarra.nombre}</p>
                      <div className={styles.cantidad}>
                        Cantidad: 
                        <div className={styles["cantidad-btn"]} onClick={ ()=> cambiarCantidad(guitarra, guitarra.cantidad-1)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        {guitarra.cantidad}
                        <div className={styles["cantidad-btn"]} onClick={ ()=> cambiarCantidad(guitarra, guitarra.cantidad+1)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>

                      </div>
                      <p className={styles.precio}> $<span>{guitarra.precio}</span></p>
                      <p className={styles.subtotal}>Subtotal $<span>{guitarra.precio * guitarra.cantidad}</span></p>
                    </div>

                    <div className={styles["delete-btn"]} onClick={()=> eliminarGuitarra(guitarra)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </div>
                  </div>
                )
              })
            ):
            (
                <p>No hay productos agragados al carrito</p>
            )
            }
          </div>

          <aside className={styles.resumen}>
            <h3>Resumen del pedido</h3>
            <p>Total a pagar: <span>${total}</span></p>
          </aside>
        </div>
      </main>
    </Layout>
  )
}

export default Carrito