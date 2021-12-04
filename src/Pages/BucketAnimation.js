import Lottie from 'react-lottie';
import Bucket from './bucket.json';

const lottieOptions ={
    animationData: Bucket, 
    loop: true, 
    autoplay: true, 
    rendererSettings: {
      className:'add-class',
      SVGAnimatedPreserveAspectRatio:'xMidYMid slice'
    }
  }

const BucketAnimation =() =>{
    return (
        <div>
            <Lottie options={lottieOptions} style={{width:'1200px',height:'1200px'}}/>
        </div>
    )
}
export default BucketAnimation;