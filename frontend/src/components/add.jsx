import './styles/add.css';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';
import {useState ,useEffect} from 'react';
import Activate from './helpers/notifications.jsx';

export default function Add(){
  /*parametros para agregar un conductor o ayudante*/
  const [nombre, setNombre] = useState("");
  const [DPI, setDPI] = useState("");
  const [NIT, setNIT] = useState("");
  const [edad, setEdad] = useState("");
  const [type, setType] = useState("");
  /*traer conductores y ayudantes*/
  const [conductores, setConductores] = useState([]);
  const [ayudantes, setAyudantes] = useState([]);
  /*parametros para agregar un camion*/
  const [placa, setPlaca] = useState("");
  const [km_lt, setKm_lt] = useState("");
  const [capacity, setCapacity] = useState("");
  const [departament, setDepartament] = useState("");
  const [cargo_type, setCargo_type] = useState("");
  const [chofer, setChofer] = useState("");
  const [helper, setHelper] = useState("");

  const [modal_add_truck, setModal_add_truck] = useState(false);
  const [modal_add, setModal_add] = useState(false);

  const add_truck = async()=>{
    const url="http://localhost:5000/trucks/add-truck"
    const new_truck={
      placas:placa,
      km_por_lt: km_lt,
      capacidad:capacity,
      departamento: departament,
      tipo_carga: cargo_type,
      id_conductor: chofer,
      id_ayudante: helper
    };
    try{
      const msm = await axios.post(url, new_truck);
      Activate(
	"Todo salio bien",
	"success",
	msm.data['msm']
      );
      window.location.reload();
    }catch(e){
      Activate(
	"Algo salio mal",
	"danger",
	e.message
      )
    }
  }


  const get_employees = async()=>{
    const url1 = "http://localhost:5000/trucks/get-helpers";
    const url2 = "http://localhost:5000/trucks/get-conductors";

    try{
      const data1 = await axios.get(url1);
      const data2 = await axios.get(url2);
      setConductores(data2.data["data"]);
      setAyudantes(data1.data["data"]);
    }catch(e){
      Activate(
	"Algo ocurrio",
	"danger",
	e.message
      );
    }
  }

  const add_employee = async()=>{
    const new_employee = {
      nombre_completo: nombre,
      DPI: DPI,
      NIT: NIT,
      edad:edad
    };

    const url = "http://localhost:5000/trucks/add/"+type;

    try{ 
      const msm = await axios.post(url, new_employee);
      Activate(
	"Todo salio bien",
	"success",
	msm.data['msm']
      );
      setModal_add(false);
      window.location.reload();
    }catch(e){
      Activate(
	"Algo ocurrio",
	"danger",
	e.message
      );
    }
  }

  useEffect(()=>{
    get_employees();
  },[]);
  return(
    <div className="add">
    <button onClick={()=>{setModal_add(true);}} class="btn btn-success">Agregar nuevo empleado</button>
    <button onClick={()=>{setModal_add_truck(true);}} class="btn btn-success">Agregar nuevo camion</button>

    <Modal isOpen={modal_add}>
      <ModalHeader>
        <h1>Agregar nuevo conductor o ayudante</h1>
      </ModalHeader>
      <ModalBody>
        <div className="input">
        <input className="form-control" type="text" placeholder="Por favor introduzca su nombre completo"
	 onChange={(event)=>{setNombre(event.target.value);}} />
	</div>
        <div className="input">
	<input className="form-control" type="number" placeholder="Por favor introduzca su numero de DPI"
	  onChange={(event)=>{setDPI(event.target.value);}} />
        </div>
        <div className="input">
	<input className="form-control" type="number" placeholder="Por favor introduzca su numero de NIT"
	  onChange={(event) =>{setNIT(event.target.value);}}/>
        </div>
        <div className="input">
       <input className="form-control" type="number" placeholder="Por favor introduzca su edad"
	  onChange={(event)=>{setEdad(event.target.value);}}/>
    <div  className="input">
      <select onChange={(event)=>{setType(event.target.value);}}className="form-select">
        <option value="1">Conductor</option>
        <option value="2">Ayudante</option>
      </select>
    </div>
       </div>
      </ModalBody>
      <ModalFooter>
        <button onClick={()=>{setModal_add(false);}} className="btn btn-danger">Cancelar</button>
        <button onClick={add_employee} className="btn btn-success">Agregar</button>
      </ModalFooter>
    </Modal>


    <Modal isOpen={modal_add_truck}>
      <ModalHeader>
        <h1>Agregar un camion</h1>
      </ModalHeader>
      <ModalBody >
        <div class="input"><input class="form-control" type="text" placeholder="Por favor ingrese la placa"
	onChange={(event)=>{setPlaca(event.target.value);}}/></div>
        <div class="input"><input class="form-control" type="number" placeholder="por favor ingrese los km/lt"
	  onChange={(event)=>{setKm_lt(event.target.value);}}/></div>
        <div class="input"><input class="form-control" type="number" placeholder="por favor ingrese la capacidad en cc"
	onChange={(event)=>{setCapacity(event.target.value);}}/></div>
        <div class="input"><input class="form-control" type="text" placeholder="por favor ingrese el departamento"
	onChange={(event)=>{setDepartament(event.target.value);}}/></div>
	<div class="input">
	  <select onChange={(event)=>{setCargo_type(event.target.value);}} >
	    <option value="1">Refrigerado</option>
	    <option value="2">No refrigerado</option>
	  </select>
	</div>
	<div class="input">
	  <select onChange={(event)=>{setChofer(event.target.value);}} id="" name="">
    {conductores.map(conductor=>(
	    <option value={conductor.id}>{conductor.nombre_completo}</option>
    ))}
	  </select>
	</div>
	<div class="input">
	  <select onChange={(event)=>{setHelper(event.target.value);}} id="" name="">
    {ayudantes.map(ayudante=>(
	    <option value={ayudante.id}>{ayudante.nombre_completo}</option>
))}
	  </select>
	</div>
      </ModalBody>
      <ModalFooter>
        <button onClick={()=>{setModal_add_truck(false);}} class="btn btn-danger">Cancelar</button>
        <button onClick={add_truck} class="btn btn-success">Agregar</button>
      </ModalFooter>
    </Modal>
    </div>
  )
}
