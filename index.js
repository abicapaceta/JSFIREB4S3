
    
    var firebaseConfig = {
        apiKey: "AIzaSyCzn9Ns0m1rT8D5L6x8sQp9y8JEcAEjuBM",
    authDomain: "abicdb-93d79.firebaseapp.com",
    databaseURL: "https://abicdb-93d79-default-rtdb.firebaseio.com",
    projectId: "abicdb-93d79",
    storageBucket: "abicdb-93d79.appspot.com",
    messagingSenderId: "651823119173",
    appId: "1:651823119173:web:900808b5843af08adb5c2c",
    measurementId: "G-F36XZNYZLW"
      };
   

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var categoria = document.getElementById("Input2").value;
    var tipo= document.getElementById("Input3").value;
    var medida= document.getElementById("Input4").value;
    var existencia= document.getElementById("Input5").value;
    var precio= document.getElementById("Input6").value;
    var idproveedor= document.getElementById("Input7").value;
    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var producto = {
            id, //matricula:id
            categoria,
            tipo,
            medida,
            existencia,
            precio,
            idproveedor
        }

        //console.log(alumno);

        firebase.database().ref('Productos/' + id).update(producto).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Productos');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(producto){
    
    if(alumno!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);
    

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = producto.id;
        cell2.innerHTML = producto.categoria;
        cell3.innerHTML = producto.tipo;
        cell4.innerHTML=producto.medida;
        cell5.innerHTML=producto.existencia;
        cell6.innerHTML=producto.precio;
        cell7.innerHTML=producto.idproveedor;
      
    }
}

function deleteR(id){
    firebase.database().ref('Productos/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Alumnos/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(alumno){
    if(alumno!=null)
    {
        document.getElementById("Input1").value=producto.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=producto.categoria;
        document.getElementById("Input3").value=producto.tipo;
        document.getElementById("Input4").value=producto.medida;
        document.getElementById("Input5").value=producto.existencia;
        document.getElementById("Input6").value=producto.precio;
        document.getElementById("Input7").value=producto.idproveedor;
    }
}


// //Para consulta de carrera
// function readQ(){
//     document.getElementById("Table2").innerHTML='';
//     var c = document.getElementById("Input8").value;

//     var ref = firebase.database().ref("Productos");
//     ref.orderByChild("carrera").equalTo(c).on("child_added", function(snapshot) {
//         printRowQ(snapshot.val());
//     });

// }


// function printRowQ(producto){

//     var table = document.getElementById("Table2"); 
    
//     //creamos un nuevo elemento en la tabla en la ultima posicion
//     var row = table.insertRow(-1);

//     //Insertamos cada una de las celdas/columnas del registro
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);
//     var cell3 = row.insertCell(2);
//     var cell4 = row.insertCell(3);
    
//     //Agregamos la informacion a cada una de las columnas del registro
//     cell1.innerHTML = alumno.id;
//     cell2.innerHTML = alumno.nombre; 
//     cell3.innerHTML = alumno.correo;
//     cell4.innerHTML = alumno.carrera; 
   
// }