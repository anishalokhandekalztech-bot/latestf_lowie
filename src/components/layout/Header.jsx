import Logo from "../../assets/Logos/logo.svg"; 
import '../../index.css'
function Header(){
    return (
        <>
            <div style={{ width:'100%',height:'5%'}}>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    width:'max-content',
                    marginBottom:'2vh',
                    gap:'1vw',
                    padding:'10px',
                    paddingLeft:'20px'
                }}>
                <img 
                    src={Logo} 
                    style={{
                        height:'5vh',
                        width:'5vh'
                    }} 
                />
                <h2 className="header"
                    style={{ 
                        color: 'white',
                        marginTop:0,
                        marginBottom:0,
                        alignItems:'center',
                        justifyContent:'center',
                        textAlign:'center'
                    }}>
                         Flowie KalzTech
                </h2>

            </div>
            </div>
        </>
    );
}

export {Header};