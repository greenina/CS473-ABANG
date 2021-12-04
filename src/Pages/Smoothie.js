
import Lottie from 'react-lottie';
import Smoothie from './17108-smoothie.json';

const lottieOptions ={
    animationData: Smoothie, 
    loop: true, 
    autoplay: true, 
    rendererSettings: {
      className:'add-class',
      SVGAnimatedPreserveAspectRatio:'xMidYMid slice'
    }
  }

const SmoothieComponent =() =>{
    return (
        <div>
            <Lottie options={lottieOptions} style={{width:'300px',height:'300px'}}/>
        </div>
    )
}
export default SmoothieComponent;