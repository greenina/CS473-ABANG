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
            <Lottie options={lottieOptions} style={{ position: "absolute", width:'100%'}}/>
        </div>
    )
}
export default BucketAnimation;