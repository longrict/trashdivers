import './landing.css';

function Landing(props) {

    const aboutUsMsg = "We believe in the power of community and the strength of collective action. "
                    + "Our mission is simple: to mobilize people like you to make a real, "
                    + "tangible difference in the cleanliness and beauty of our cities. "
                    + "At TrashDivers, we believe that everyone has a role to play in "
                    + "maintaining the beauty and health of our cities. Our platform connects passionate volunteers " 
                    + "with the resources and support they need to organize and execute successful cleaning events. " 
                    + "Whether it's a park, a beach, a neighborhood street, or any other spot in need of care, we "
                    + "make it easy for you to get involved and make a lasting impact. ";
    
    const productMsg = "TrashDivers is your go-to platform for tackling litter and improving the environment in local areas. "
                    +  "Our service allows users to report garbage hotspots and organize community clean-up events, streamlining"
                    +  " the process of mobilizing efforts to combat litter. "
                    +  "Our platform features intuitive event planning tools, real-time updates, "
                    +  "and a supportive community to ensure that every cleanup is efficient and impactful. "
                    +  "Join us in our mission to create cleaner, greener spaces and make a lasting difference in your community." 
                    +  "With TrashDivers, you have the power to transform local environments and foster a sense of shared responsibility for a healthier planet."

    const engagement = "We aim to foster a sense of community and shared responsibility "
                    +  "by bringing people together to clean and improve their local areas."
    const stewardship = "We are committed to protecting and preserving "
                    +  "the environment by reducing litter and promoting sustainable practices.";
    const empowerment = "We provide the tools, resources, and support needed for individuals and groups to take "
                    + "initiative and lead their own cleaning events.";

    const missionNames = ["Community Engagement", "Environmental Stewardship", "Empowerment"]
    const missionDescs = [engagement,stewardship,empowerment];
    const missionIcons = ["/images/exercise-autumn-svgrepo-com.svg","/images/image-of-the-rainy-season-hydrangea-and-rain-svgrepo-com.svg","/images/supporting-person-diagonal-svgrepo-com.svg"];

    return (
        <div className="landing-body">
            <div id="first">
                <div className="image-container">
                    <div>
                        <div className="text">
                            <h1 className="add-shadow" style={{fontSize:'50px'}}>{"Your pals are cleaning. Why aren't you?"}</h1>
                            <p className="add-shadow">
                                {"Earth's last line of offense against litter.\nEnlist in the TrashDivers initiative and join the fight for a cleaner environment across the world."}
                            </p>
                        </div>       
                        <button id="join-button">Join now</button>  
                    </div>   
                    <video width="600" autoPlay muted loop id="vid">
                        <source src="/images/vecteezy_plastic-trash-littering-the-ocean-shore-concept-of-ocean_21199882.mp4" type="video/mp4"></source>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            <div className='seperator'></div>

            <div style={{display:'flex',flexDirection:'column',padding:'10px 0px 80px 0px',alignItems:'center'}}>
                    <h1 style={{color:'black'}}>Our mission:</h1>
                    <div style={{borderStyle:'ridge',borderWidth:'0px 2px 2px 2px',width:'90%'}}>
                        <div className="missions">
                            {missionNames.map((name,index)=>{
                                return(
                                <div className="mission">
                                    <h2>{name}</h2>
                                    <img src={missionIcons[index]} style={{height:'100px',width:'auto'}}></img>
                                    <p style={{fontSize:'15px'}}>{missionDescs[index]}</p>
                                </div>)
                            })}
                        </div>
                    </div>
            </div>
                            
            <div className='seperator'></div>

            <div className="landing-content" style={{paddingTop:'70px'}}>
                <div className="desc">
                    <h1>About TrashDivers</h1>
                    <p>{aboutUsMsg}</p>
                </div>
                <img src="/images/cleaningPals_V2.png"></img>
            </div>
            <div className="landing-content" style={{paddingBottom:'30px'}}>
                <img src="/images/map.png" style={{borderStyle:'solid',borderColor:'#EFE4B0',borderWidth:'8px', height:'100%'}}></img>
                <div className="desc">
                    <h1>Our Product</h1>
                    <p>{productMsg}</p>
                </div>
            </div>
    </div>
    )
}

export{Landing};