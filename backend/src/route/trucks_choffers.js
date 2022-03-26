const express = require('express');
const router = express.Router();
const getConnection = require('../database/connection');

/*
 * Como primer punto se tiene los metodos get necesarios para el mantenimiento de camiones
 * */

router.get('/see-trucks', async(req,res)=>{
  try{
    const pool = await getConnection();
    const result = await pool.request().query('EXEC get_trucks'); 
    if(result.recordset.length > 0){
      res.status(200).json({
	"msm": "Estos son los datos",
	"data": result.recordset
      });
    }else{
      res.status(200).json({
	"msm": "Esta tabla esta vacia por favor agregar datos"
      });
    }
  }catch(e){
    res.status(500).json({
      "msm": "un error inesperado ha ocurrido",
      "error": e.message
    });
  }
});

/*
 * Aca tendremos el get de los datos de conductores y ayudantes para facilitar el agregar un camion
 * */

router.get('/get-conductors', async(req,res)=>{
  try{
    const pool = await getConnection();
    const conductors = await pool.request().query('SELECT * FROM conductor');
    if(conductors.recordset.length > 0){
      res.status(200).json({
	"msm": "Estos son los datos",
	"data":conductors.recordset 
      });
    }else{
      res.status(200).json({
	"msm":"Esta tabla esta vacia por favor agregar datos"
      });
    }
  }catch(e){
    res.status(500).json({
      "msm": "un error inesperado ha ocurrido",
      "error": e.message
    });
  }
});

router.get('/get-helpers', async(req,res)=>{
  try{
    const pool = await getConnection();
    const helpers = await pool.request().query('SELECT * FROM ayudante');
    if(helpers.recordset.length > 0){
      res.status(200).json({
	"msm": "Estos son los datos",
	"data": helpers.recordset
      });
    }else{
      res.status(200).json({
	"msm": "Esta tabla esta vacia por favor agregar datos"
      });
    }
  }catch(e){
    res.status(500).json({
      "msm": "un error inesperado ha ocurrido",
      "error": e.message
    });
  }
});

/*
 * a razon de que la tabla de camiones es dependiente de los conductores y ayudantes
 * aca esta el agregar conductor y ayudante
 * */

router.post('/add/:type', async(req,res)=>{
  const {type} = req.params;
  const {
    nombre_completo,
    DPI,
    NIT,
    edad
  }  = req.body;
  try{
    const pool = await getConnection();
    if(type == 1){
    await pool
      .request()
      .input("nombre_completo", nombre_completo)
      .input("DPI", DPI)
      .input("NIT", NIT)
      .input("edad", edad)
      .query('INSERT INTO conductor (nombre_completo, DPI, NIT, edad) VALUES (@nombre_completo, @DPI, @NIT, @edad)');
    }else{
    await pool
      .request()
      .input("nombre_completo", nombre_completo)
      .input("DPI", DPI)
      .input("NIT", NIT)
      .input("edad", edad)
      .query('INSERT INTO ayudante (nombre_completo, DPI, NIT, edad) VALUES (@nombre_completo, @DPI, @NIT, @edad)');
    }

    res.status(200).json({
      "msm":"Se ha agregado correctamente"
    });

  }catch(e){
    res.status(500).json({ 
      "msm": "un error inesperado ha ocurrido",
      "error": e.message     
    })
  }
});

/*
 * aca tendremos el agregar un nuevo camion
 * */

router.post('/add-truck', async(req, res)=>{
  const {
    placas,
    km_por_lt,
    capacidad,
    departamento,
    tipo_carga,
    id_conductor,
    id_ayudante
  } = req.body;
  try{
    const pool = await getConnection();
    const resul = await pool
      .request()
      .input("placas", placas)
      .input("km_por_lt", km_por_lt)
      .input("capacidad", capacidad)
      .input("departamento", departamento)
      .input("tipo_carga", tipo_carga)
      .input("estado", 1)
      .input("id_conductor", id_conductor)
      .input("id_ayudante", id_ayudante)
      .query('INSERT INTO camion (placas, km_por_lt, capacidad_cc, departamento, tipo_carga, estado, id_conductor, id_ayudante) VALUES (@placas, @km_por_lt, @capacidad, @departamento, @tipo_carga, @estado, @id_conductor, @id_ayudante)');
    console.log(resul);
    res.status(200).json({
      "msm":"Se ha agregado correctamente"
    })
  }catch(e){
     res.status(500).json({ 
      "msm": "un error inesperado ha ocurrido",
      "error": e.message     
    })

    console.log(e.message);
  }
});

/*
 * Aca tendremos el eliminar 
 * */

router.delete('/delete-truck/:id', async (req, res)=>{
  const {id} = req.params;
  try{
    const pool = await getConnection();
    await pool
      .request()
      .input("id", id)
      .query('DELETE FROM camion WHERE id = @id');
    res.status(200).json({
      "msm":"Se ha eliminado correctamente"
    });
  }catch(e){
     res.status(500).json({ 
      "msm": "un error inesperado ha ocurrido",
      "error": e.message
  });
  }
});

/*
 * para fines mas practicos se necesita de la informacion anterior para poder editar aca tendremos el get de la informacion anterior
 * */

router.get('/get-to-edit/:id', async(req,res)=>{
  const {id} = req.params;
  try{
    const pool = await getConnection();
    const truck = await pool
      .request()
      .input("id", id)
      .query("SELECT * FROM camion WHERE id = @id");
    res.status(200).json({
      "msm":"Estos son los datos",
      "data":truck.recordset
    });
  }catch(e){
     res.status(500).json({ 
      "msm": "un error inesperado ha ocurrido",
      "error": e.message
     })
  }
});

/*
 * Aca tenemos la ruta de editar datos.
 * */

router.put('/edit-truck/:id', async(req, res) =>{
  const  {id} = req.params;
  const {
    placas,
    km_por_lt,
    capacidad,
    departamento,
    tipo_carga,
    id_conductor,
    id_ayudante
  } = req.body;
  try{
    const pool = await getConnection();
    await pool
      .request()
      .input("placas", placas)
      .input("km_por_lt", km_por_lt)
      .input("capacidad", capacidad)
      .input("departamento", departamento)
      .input("tipo_carga", tipo_carga)
      .input("estado", 1)
      .input("id_conductor", id_conductor)
      .input("id_ayudante", id_ayudante)
      .input("id", id)
      .query('UPDATE camion SET placas = @placas, km_por_lt = @km_por_lt, capacidad_cc = @capacidad, departamento = @departamento, tipo_carga = @tipo_carga, estado = @estado, id_conductor = @id_conductor, id_ayudante = @id_ayudante WHERE id = @id');
    res.status(200).json({
      "msm": "Se ha actualizado la informacion"
    })
  }catch(e){
    res.status(500).json({
      "msm": "un error inesperado ha ocurrido",
      "error": e.message
    })
  }
})


module.exports = router;
