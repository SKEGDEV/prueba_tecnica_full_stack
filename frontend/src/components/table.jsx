import './styles/table.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Activate from './helpers/notifications.jsx';


export default function Table(){

  const [trucks, setTrucks] = useState([]);
  const get_trucks = async()=>{
    const url = "http://localhost:5000/trucks/see-trucks";
    try{
      const data = await axios.get(url);
      if(data.data['msm'] == "Estos son los datos"){setTrucks(data.data['data']);}
      else{setTrucks([]);}
    }catch(e){
      alert(e.message);
    }
  }

  const delete_truck = async (id)=>{
    const url = "http://localhost:5000/trucks/delete-truck/"+id;
    try{
      const msm = await axios.delete(url);
      Activate(
	"Todo esta correcto",
	"success",
	msm.data["msm"]
      );
    }catch(e){
      Activate(
	"Algo salio mal",
	"danger",	
	e.message
      );
    }

  }

  useEffect(()=>{
    get_trucks();
  },[])
  return(
    <div className="reduce-table">
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th>Placa</th>
          <th>Capacidad</th>
          <th>Departamento</th>
          <th>Estado</th>
          <th>KM/LT</th>
          <th>Conductor</th>
          <th>Ayudante</th>
	  <th>Tipo de carga</th>
	  <th></th>
	  <th></th>
        </tr>
      </thead>
      <tbody>
    {trucks.map(data =>(
        <tr>
          <td>{data.placas}</td>
          <td>{data.capacidad_cc+" "}cc</td>
          <td>{data.departamento}</td>
          <td>{data.estado}</td>
          <td>{data.km_por_lt+" "}km/lt</td>
          <td>{data.conductor}</td>
          <td>{data.ayudante}</td>
	  <td>{data.tipo_carga}</td>
	  <td><button onClick={()=>{delete_truck(data.id);}} className="btn btn-danger">Eliminar</button></td>
	  <td><button className="btn btn-warning">Editar</button></td>
        </tr>
))}
      </tbody>
    </table>
    </div>
  );
}
