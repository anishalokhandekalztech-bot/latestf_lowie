import '../../index.css'
import Mode_icon from '../../assets/Icons/Light_mode.svg'

function LightDarkMode(){
    return(
        <img src={Mode_icon} alt="mode change Icon" className='icons_sidebar'/>
    )
}
export {LightDarkMode};
