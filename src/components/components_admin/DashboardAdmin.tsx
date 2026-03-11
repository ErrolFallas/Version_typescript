import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ServicesProducto from "../../services/ServicesProducto";
import { Producto, ActualizacionProducto } from '../../types/producto';

function DashboardAdmin() {

  const [nombreProducto, setNombreProducto] = useState<string>("")
  const [categoriaProductos, setCategoriaProductos] = useState<string>("")
  const [precioProducto, setPrecioProducto] = useState<number>(0)
  const [stockProducto, setStockProducto] = useState<number>(0)

  const [drawerAbierto, setDrawerAbierto] = useState<boolean>(false)/* controla si el panel lateral aparece */ /* al ser false el useState esta refiriendo a que esta recibiendo un dato boleani */
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null)/* guarda el producto seleccionado */

  const [editarNombre, setEditarNombre] = useState<string>("")/* edicion de cada propiedad del objeto */
  const [editarCategoria, setEditarCategoria] = useState<string>("")
  const [editarPrecio, setEditarPrecio] = useState<number>(0)
  const [editarStock, setEditarStock] = useState<number>(0)


  async function registroProducto() { /* para el registro de productos con el post */
    if (!nombreProducto.trim() || !categoriaProductos.trim() || precioProducto === 0 || stockProducto === 0) {
      Swal.fire({
        title: '¡error!',
        text: 'Todos los campos deben estar llenos con datos válidos',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    } else {
      if (precioProducto <= 0) { /* ningun precio no puede ser distinto a valores positivos */
        Swal.fire({
          title: '¡error!',
          text: 'se requiere un valores mayor a cero en precio',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      } else {
        if (stockProducto < 0) {
          Swal.fire({
            title: '¡error!',
            text: 'No puede registrar un stock menor a 0',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
        } else {
          if (precioProducto.toString().includes(".") || precioProducto.toString().includes(",") || precioProducto.toString().includes("e") || stockProducto.toString().includes(".") || stockProducto.toString().includes(",") || stockProducto.toString().includes("e")) {
            Swal.fire({
              title: 'Error',
              text: 'Precio y stock deben ser números enteros sin decimales ni notación científica',
              icon: 'warning',
              confirmButtonText: 'Aceptar'
            });
          } else {
            const datosProducto = await ServicesProducto.getProductos()
            const productoExiste = datosProducto.find((p: Producto) => p.producto === nombreProducto)
            if (productoExiste) {
              Swal.fire({
                title: '¡error!',
                text: 'Este producto ya se encuentra en stock',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
              });


            } else {
              const productoRegistro: Producto = {
                producto: nombreProducto,
                categoria: categoriaProductos,
                precio: precioProducto,
                stock: stockProducto
              }
              let productosAlmacenados = await ServicesProducto.postProductos(productoRegistro)
              if (productosAlmacenados) {
                let informacionProductos = await ServicesProducto.getProductos()
                setProductosAlmacenados(informacionProductos)
                Swal.fire({
                  title: '¡Éxito!',
                  text: 'La operación se realizó correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                })
                setNombreProducto("");
                setCategoriaProductos("");
                setPrecioProducto(0);
                setStockProducto(0);
              }
            }
          }
        }


      }

    }


  }

  const [productosAlmacenados, setProductosAlmacenados] = useState<Producto[]>([]) /* premitir que aparezca en la pantalla los productos registrados arriba */ /* la tabla depende de productosSTock, si esta cambia , se vuelve a renderizar */
  useEffect(() => {
    async function CargarProducto() {
      let informacionProductos = await ServicesProducto.getProductos()
      setProductosAlmacenados(informacionProductos)
    }
    CargarProducto()
  }, [])

  async function botonEliminarProducto(id: number) { /* eliminar producto del stock */
    const resultado = await Swal.fire({
      title: "¿Seguro que quieres eliminar este usuario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (resultado.isConfirmed) {
      await ServicesProducto.deleteProductos(id);
      let informacionProductos = await ServicesProducto.getProductos()
      setProductosAlmacenados(informacionProductos)

    }
  }


  /*  METODO PATCH CON Drawer lateral(panel deslizante) */
  function abrirDrawer(producto: Producto) { /* se abre tras tocar el boton editar y cambia el panel a verdadero */
    setProductoEditando(producto) /* primero copia el valor completo del producto */

    setEditarNombre(producto.producto) /* reibe los datos del db.json en su contenido de los input por default */
    setEditarCategoria(producto.categoria)
    setEditarPrecio(producto.precio)
    setEditarStock(producto.stock)


    setDrawerAbierto(true) /* solo si es true se abre el drawer */
  }
  async function guardarCambiosProducto() { /* si todas las condiciones se cumplen, se efectua el cambio */

    if (!editarNombre.trim() || !editarCategoria.trim() || editarPrecio === 0 || editarStock === 0) {
      return Swal.fire({
        title: 'Error',
        text: 'Todos los campos deben estar llenos con datos válidos',
        icon: 'warning'
      })
    }

    if (Number(editarPrecio) <= 0) {
      return Swal.fire({
        title: 'Error',
        text: 'El precio debe ser mayor a 0',
        icon: 'warning'
      })
    }

    if (Number(editarStock) < 0) {
      return Swal.fire({
        title: 'Error',
        text: 'No puede registrar un stock menor a 0',
        icon: 'warning'
      })
    }

    if (editarPrecio.toString().includes(".") || editarPrecio.toString().includes(",") || editarPrecio.toString().includes("e") || editarStock.toString().includes(".") || editarStock.toString().includes(",") || editarStock.toString().includes("e")) {
      return Swal.fire({
        title: 'Error',
        text: 'Precio y stock deben ser números enteros sin decimales ni notación científica',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }

    const datosActualizados: ActualizacionProducto = {
      producto: editarNombre,
      categoria: editarCategoria,
      precio: editarPrecio,
      stock: editarStock
    }
    if (!productoEditando || productoEditando.id === undefined) return
    await ServicesProducto.updatePatchProductos(productoEditando.id, datosActualizados) /* actualizar el db.json */

    const informacionProductos = await ServicesProducto.getProductos() /* se vuelven a pedir los productos y renderiza la tabla con el set de abajo */
    setProductosAlmacenados(informacionProductos)

    setDrawerAbierto(false) /* vuelve a cerrar el drawer */

    Swal.fire({
      title: 'Actualizado',
      text: 'Producto actualizado correctamente',
      icon: 'success'
    })
  }

  return (
    <main id='dashboaradmin'>
      <div id='dashboaradmin-registroProductos'>
        <label htmlFor="nombreProducto">Nombre del producto:</label>
        <input type="text" name="nombreProducto" id="nombreProducto" value={nombreProducto} onChange={(evento) => setNombreProducto(evento.target.value)} />
        <br />
        <label htmlFor="categoriaProductos">Categoria del producto</label>
        <select name="categoriaProductos" id="categoriaProductos" value={categoriaProductos} onChange={(evento) => setCategoriaProductos(evento.target.value)}>
          <option value="">---</option>
          <option value="frutas">Frutas</option>
          <option value="verduras">Verduras</option>
          <option value="carnes">Carnes</option>
          <option value="lacteos">Lácteos</option>
          <option value="cuidadopersonal">Cuidado personal</option>
          <option value="limpieza">Limpieza</option>
          <option value="panaderia">Panadería</option>
          <option value="bebidas">Bebidas</option>
          <option value="snacks">Snacks</option>
          <option value="licores">Licores</option>
        </select>
        <br />
        <label htmlFor="precioProducto">Precio</label>
        <input type="number" name="precioProducto" id="precioProducto" value={precioProducto === 0 ? "" : precioProducto} onChange={(evento) => setPrecioProducto(evento.target.value === "" ? 0 : Number(evento.target.value))} />

        <label htmlFor="stockProducto">Stock</label>
        <input type="number" name="stockProducto" id="stockProducto" value={stockProducto === 0 ? "" : stockProducto} onChange={(evento) => setStockProducto(evento.target.value === "" ? 0 : Number(evento.target.value))} />
        <br />
        <button onClick={registroProducto}>Registrar producto</button>

      </div>
      <div id='dashboaradmin-listaProductos'>
        <table id='dashboaradmin-listaProductos-table'>
          <thead id='dashboaradmin-listaProductos-thead'>
            <tr>
              <th>Nombre del producto</th>
              <th>Categoria del producto</th>
              <th>Precio del producto</th>
              <th>Stock del producto</th>
              <th>Botones</th>
            </tr>

          </thead>
          <tbody id='dashboaradmin-listaProductos-tbody'>

            {productosAlmacenados.map((producto) =>
              <tr key={producto.id}>
                <td>{producto.producto}</td>
                <td>{producto.categoria}</td>
                <td> ₡{producto.precio}</td>
                <td>{producto.stock} unidades</td>
                <td>
                  <div className="botonesModificar">
                    <button className="botonEditarProducto" onClick={() => abrirDrawer(producto)}>Editar</button>

                    <button onClick={() => producto.id !== undefined && botonEliminarProducto(producto.id)} className="botonEliminarProducto" >Eliminar</button>
                  </div>
                </td>
              </tr>
            )}

          </tbody>

        </table>
      </div>
      <div>
        {drawerAbierto && ( /* con esto se renderiza la pagina, mediante una renderizacion condicional, si es true va mostrar draweer y si es false no renderiza y no muestra */

          <div className="drawerOverlay">

            <div className="drawerPanel">

              <h2>Editar producto</h2>

              <label>Nombre</label>
              <input type="text" value={editarNombre} onChange={(e) => setEditarNombre(e.target.value)} />

              <label>Categoria</label>
              <select value={editarCategoria} onChange={(e) => setEditarCategoria(e.target.value)}>
                <option value="frutas">Frutas</option>
                <option value="verduras">Verduras</option>
                <option value="carnes">Carnes</option>
                <option value="lacteos">Lácteos</option>
                <option value="cuidadoPersonal">Cuidado personal</option>
                <option value="limpieza">Limpieza</option>
                <option value="panaderia">Panadería</option>
                <option value="bebidas">Bebidas</option>
                <option value="snacks">Snacks</option>
                <option value="licores">Licores</option>
              </select>

              <label>Precio</label>
              <input type="number" value={editarPrecio === 0 ? "" : editarPrecio} onChange={(e) => setEditarPrecio(e.target.value === "" ? 0 : Number(e.target.value))} />

              <label>Stock</label>
              <input type="number" value={editarStock === 0 ? "" : editarStock} onChange={(e) => setEditarStock(e.target.value === "" ? 0 : Number(e.target.value))} />

              <div className="drawerBotones">
                <button onClick={guardarCambiosProducto}>Guardar cambios</button>

                <button onClick={() => setDrawerAbierto(false)}> {/* para cerrar pestaña lateral, sin cambios */}Cancelar</button>
              </div>

            </div>

          </div>

        )}
      </div>
    </main>

  )
}

export default DashboardAdmin
