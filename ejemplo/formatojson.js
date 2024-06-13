// JSON con la información de la tienda y los clientes
const tiendaJson = {
    "tienda": {
    "nombre": "Tienda Ejemplo",
    "productos": [
        {
        "nombre": "Ordenador Portátil",
        "clientes": [
            {
            "nombre": "Ivania",
            "apellido": "Zambrano",
            "edad": 34,
            "fecha_compra": "2024-01-15"
            },
            {
            "nombre": "Laura",
            "apellido": "Fernández",
            "edad": 28,
            "fecha_compra": "2024-02-10"
            }
        ]
        },
        {
        "nombre": "Teléfono Móvil",
        "clientes": [
            {
            "nombre": "Javier",
            "apellido": "Martín",
            "edad": 40,
            "fecha_compra": "2024-03-05"
            },
            {
            "nombre": "Sofía",
            "apellido": "García",
            "edad": 22,
            "fecha_compra": "2024-04-01"
            }
          ]
        }
      ]
    }
  };
  
  // Acceder al nombre de la tienda
  console.log("Nombre de la tienda:", tiendaJson.tienda.nombre);
  
  // Iterar sobre los productos y sus clientes
  tiendaJson.tienda.productos.forEach(producto => {
    console.log("Producto:", producto.nombre);
    producto.clientes.forEach(cliente => {
      console.log("Cliente:", cliente.nombre, cliente.apellido, "- Edad:", cliente.edad, "- Fecha de compra:", cliente.fecha_compra);
    });
  });
  
  // Agregar un nuevo cliente a un producto
  function agregarCliente(nombreProducto, nuevoCliente) {
    const producto = tiendaJson.tienda.productos.find(p => p.nombre === nombreProducto);
    if (producto) {
      producto.clientes.push(nuevoCliente);
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
const fs = require('fs');
const jsonOutput = JSON.stringify(tiendaJson, null, 2);
console.log(jsonOutput);

  // Guardar el JSON actualizado en un archivo
fs.writeFileSync('output.json', jsonOutput, 'utf8');
