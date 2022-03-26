import 'animate.css';
import {Store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export default function Activate(tittle, type, message){
	Store.addNotification({
		title: tittle,
		message: message,
		type: type,
		container: "top-left",
		insert:"top",
		animationIn:["animate__animated", "animate__lightSpeedInLeft"],
		animationOut:["animate__animated", "animate__lightSpeedOutLeft"],
		dismiss:{
			duration: 3000,
			showIcon: true,
			pauseOnHover: true
		},
		width:320
	});
}
