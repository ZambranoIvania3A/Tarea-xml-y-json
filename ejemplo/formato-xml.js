const fs = require('fs');
const { JSDOM } = require('jsdom');
const { XMLSerializer, DOMParser } = new JSDOM().window;

// XML con la información de la tienda y los clientes
const tiendaXml = `
<tienda>
<nombre>Tienda Ejemplo</nombre>
<productos>
    <producto>
    <nombre>Ordenador Portátil</nombre>
    <clientes>
        <cliente>
        <nombre>Pedro</nombre>
        <apellido>Gómez</apellido>
        <edad>34</edad>
        <fecha_compra>2024-01-15</fecha_compra>
        </cliente>
        <cliente>
        <nombre>Laura</nombre>
        <apellido>Fernández</apellido>
        <edad>28</edad>
        <fecha_compra>2024-02-10</fecha_compra>
        </cliente>
    </clientes>
    </producto>
    <producto>
    <nombre>Teléfono Móvil</nombre>
    <clientes>
        <cliente>
        <nombre>Javier</nombre>
        <apellido>Martín</apellido>
        <edad>40</edad>
        <fecha_compra>2024-03-05</fecha_compra>
        </cliente>
        <cliente>
        <nombre>Sofía</nombre>
        <apellido>García</apellido>
        <edad>22</edad>
        <fecha_compra>2024-04-01</fecha_compra>
        </cliente>
    </clientes>
    </producto>
</productos>
</tienda>
`;

// Parsear el XML
const parser = new DOMParser();
const doc = parser.parseFromString(tiendaXml, 'application/xml');

// Acceder al nombre de la tienda
const nombreTienda = doc.querySelector('nombre').textContent;
console.log("Nombre de la tienda:", nombreTienda);

// Iterar sobre los productos y sus clientes
const productos = doc.querySelectorAll('producto');
productos.forEach(producto => {
  const nombreProducto = producto.querySelector('nombre').textContent;
  console.log("Producto:", nombreProducto);
  const clientes = producto.querySelectorAll('cliente');
  clientes.forEach(cliente => {
    const nombreCliente = cliente.querySelector('nombre').textContent;
    const apellidoCliente = cliente.querySelector('apellido').textContent;
    const edadCliente = cliente.querySelector('edad').textContent;
    const fechaCompra = cliente.querySelector('fecha_compra').textContent;
    console.log("Cliente:", nombreCliente, apellidoCliente, "- Edad:", edadCliente, "- Fecha de compra:", fechaCompra);
  });
});

// Agregar un nuevo cliente a un producto
function agregarCliente(nombreProducto, nuevoCliente) {
  const producto = Array.from(productos).find(p => p.querySelector('nombre').textContent === nombreProducto);
  if (producto) {
    const clientes = producto.querySelector('clientes');
    const nuevoClienteElem = doc.createElement('cliente');
    
    const nombreElem = doc.createElement('nombre');
    nombreElem.textContent = nuevoCliente.nombre;
    nuevoClienteElem.appendChild(nombreElem);
    
    const apellidoElem = doc.createElement('apellido');
    apellidoElem.textContent = nuevoCliente.apellido;
    nuevoClienteElem.appendChild(apellidoElem);
    
    const edadElem = doc.createElement('edad');
    edadElem.textContent = nuevoCliente.edad;
    nuevoClienteElem.appendChild(edadElem);
    
    const fechaCompraElem = doc.createElement('fecha_compra');
    fechaCompraElem.textContent = nuevoCliente.fecha_compra;
    nuevoClienteElem.appendChild(fechaCompraElem);

    clientes.appendChild(nuevoClienteElem);
    console.log(`Cliente ${nuevoCliente.nombre} agregado al producto ${nombreProducto}`);
  } else {
    console.log(`Producto ${nombreProducto} no encontrado`);
  }
}

// Ejemplo de uso de agregarCliente
const nuevoCliente = {
  "nombre": "Carlos",
  "apellido": "Lopez",
  "edad": 30,
  "fecha_compra": "2024-06-13"
};
agregarCliente("Teléfono Móvil", nuevoCliente);

// Verificar que el cliente se agregó correctamente
const serializer = new XMLSerializer();
const xmlOutput = serializer.serializeToString(doc);
console.log(xmlOutput);

// Guardar el XML actualizado en un archivo
fs.writeFileSync('output.xml', xmlOutput, 'utf8');
