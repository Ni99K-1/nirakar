//---------------------------working solution-------------
import { Stats, OrbitControls, Circle, Preload, SpotLight } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import CanvasLoader from '../loader'



 const Computers=() =>{
  const computer = useLoader(GLTFLoader, './desktop_pc/scene.gltf')
  
  //--------------MediaQuery Logic-----------------------//
  // const dino=useLoader(GLTFLoader,'./dino/dino.glb')

  // const ComputersCanvas=()=>{

  //   const [isMobile, setIsMobile]= useState(false);
  
  //   useEffect(()=>{
  //     const mediaQuery = window.matchMedia('max-width:500');
  //     setIsMobile(mediaQuery.matches)
  
  //     const handleMediaQueryChange =(event)=>{
  //       setIsMobile(event.matches)
  //     }
  //     mediaQuery.addEventListener('change', handleMediaQueryChange);
  
  //     return()=>{
  //       mediaQuery.removeEventListener('change',handleMediaQueryChange)
  //     }
  
  //   },[])
  
  // }

  return (
    <Canvas 
      frameloop='demand'
      
      camera={{ position:[20,3,5], fov:25 ,} } shadows>
     
      <directionalLight position={[25,80,45]} castShadow />
      <mesh>
      <hemisphereLight intensity={0.15}/>
        <pointLight intensity={1}/>
        <SpotLight
        position ={[-100,160,180]}
        penumbra={1}
        intensity={1}
        shadow-mapSize={1024}
      />
      </mesh>
      <primitive
        object={computer.scene}
        scale={0.75}
        position={[0, -2.75, -1.5]}//xyz axis
        rotation={[-0.01,-0.2,-0.1]}
        children-0-castShadow
      />

     {/**<primitive
      
    object={dino.scene}
   
    position={[10, .25,0]}
    children-0-castShadow
        /> */} 

      <Suspense fallback={<CanvasLoader/>}>
      <OrbitControls
        enableZoom={false}
        maxPolAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      
      </Suspense>
   
      <Preload all/>

  </Canvas>

  )
}

export default Computers;






// <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
//         <meshStandardMaterial />
//       </Circle>
//       <OrbitControls target={[0, 1, 0]} />
//       <axesHelper args={[5]} />
//       <Stats />
//===================donot delete===the above code has worked so far
// import {Suspense, useEffect, useState} from 'react'
// import {Canvas} from '@react-three/fiber';

// import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
// import { HemisphereLight } from 'three';
// import CanvasLoader from '../Loader'
//  const Computers = () => {

//   const computer = useGLTF('./desktop_pc/scene.gltf');

//  return (
//     <mesh>
//           <HemisphereLight intensity={0.15} groundColor="black"/>
//           <pointLight intensity={1} />
//           <primitive 
//             object={computer.scene}
//           /> 
//    </mesh>
//   );

// }
// const ComputersCanvas = () => {
//   return (
//       <Canvas>

//           shadows
//           camera={{
//               position: [20, 3, 5],
//               fov: 25,
//           }}
          
//           <Suspense fallback={<CanvasLoader />}>
//               <OrbitControls
//                   enableZoom={false}
//                   maxPolarAngle={Math.PI / 2}
//                   minPolarAngle={Math.PI / 2}
//               />
            
//               <Computers />
//           </Suspense >
//           <Preload all />
//       </Canvas>
//   );
// };


// export default ComputersCanvas;




