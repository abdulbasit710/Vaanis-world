import {useEffect,useRef} from 'react';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export function FlyingPhoenix(){
 const host=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const mount=host.current!;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(38,innerWidth/innerHeight,.1,100);
  camera.position.z=6;
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setSize(innerWidth,innerHeight);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000,0);
  mount.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xfff4d6,0x29483d,3.2));
  const sun=new THREE.DirectionalLight(0xffffff,3.6);sun.position.set(4,6,7);scene.add(sun);
  const birdRoot=new THREE.Group();scene.add(birdRoot);
  const glowLight=new THREE.PointLight(0xffb229,2.2,4);glowLight.position.set(0,0,.5);birdRoot.add(glowLight);
  const pointer=new THREE.Vector2(.55,.1),previous=new THREE.Vector3();
  const cursorTip=mount.querySelector<HTMLElement>('.phoenixCursorTip')!;
  const finePointer=matchMedia('(pointer:fine)').matches;
  let mixer:THREE.AnimationMixer|undefined,raf=0,last=performance.now(),modelReady=false,pointerSeen=false,hovering=false;
  const start=last;

  new GLTFLoader().load('/assets/phoenix-bird.glb',gltf=>{
   const model=gltf.scene;
   const box=new THREE.Box3().setFromObject(model),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
   const normalizedScale=1.85/Math.max(size.x,size.y,size.z);
   model.scale.setScalar(normalizedScale);
   model.position.copy(center).multiplyScalar(-normalizedScale);
   model.traverse(object=>{if(object instanceof THREE.Mesh){object.frustumCulled=false;const materials=Array.isArray(object.material)?object.material:[object.material];materials.forEach(material=>{material.side=THREE.DoubleSide;material.needsUpdate=true})}});
   birdRoot.add(model);modelReady=true;
   if(gltf.animations.length){mixer=new THREE.AnimationMixer(model);const action=mixer.clipAction(gltf.animations[0]);action.setLoop(THREE.LoopRepeat,Infinity);action.play()}
  });

  const move=(event:PointerEvent)=>{
   pointer.set(event.clientX/innerWidth*2-1,-(event.clientY/innerHeight*2-1));
   pointerSeen=true;
   cursorTip.style.transform=`translate3d(${event.clientX}px,${event.clientY}px,0)`;
   mount.classList.add('tracking');
   hovering=event.target instanceof Element&&Boolean(event.target.closest('a,button'));
  };
  const resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight)};
  addEventListener('pointermove',move,{passive:true});
  addEventListener('resize',resize,{passive:true});

  const animate=(now:number)=>{
   const dt=Math.min((now-last)/1000,.05);last=now;mixer?.update(dt);
   const active=modelReady&&scrollY>Math.min(140,innerHeight*.14);
   mount.classList.toggle('visible',active);
   document.body.classList.toggle('phoenixCursorActive',active&&finePointer);
   if(active){
    const t=(now-start)/1000;
    const halfHeight=Math.tan(THREE.MathUtils.degToRad(camera.fov*.5))*camera.position.z;
    const halfWidth=halfHeight*camera.aspect;
    const cursorMode=finePointer&&pointerSeen;
    let targetX:number,targetY:number,targetZ:number;
    if(cursorMode){
     targetX=pointer.x*halfWidth-.11;
     targetY=pointer.y*halfHeight-.1+Math.sin(t*3.1)*.018;
     targetZ=.35;
    }else{
     const phase=t*(innerWidth<700?.38:.3),xRange=Math.max(.45,halfWidth-.55);
     targetX=Math.sin(phase)*xRange;
     targetY=Math.sin(phase*1.65)*Math.max(.65,halfHeight-.55);
     targetZ=Math.sin(phase*.8)*.45;
    }
    previous.copy(birdRoot.position);
    const follow=cursorMode?7.5:3.2;
    birdRoot.position.x=THREE.MathUtils.damp(birdRoot.position.x,targetX,follow,dt);
    birdRoot.position.y=THREE.MathUtils.damp(birdRoot.position.y,targetY,follow,dt);
    birdRoot.position.z=THREE.MathUtils.damp(birdRoot.position.z,targetZ,follow,dt);
    const velocity=birdRoot.position.clone().sub(previous);
    if(velocity.lengthSq()>.000001){
     birdRoot.rotation.z=THREE.MathUtils.damp(birdRoot.rotation.z,-Math.atan2(velocity.y,Math.abs(velocity.x))*.42,5,dt);
     birdRoot.rotation.y=THREE.MathUtils.damp(birdRoot.rotation.y,velocity.x<0?Math.PI*.5:-Math.PI*.5,5,dt);
    }
    birdRoot.rotation.x=0;
    const baseScale=(innerWidth<700?.26:.14)*(hovering?1.15:1)*(1+Math.sin(t*2.2)*.018);
    const scale=THREE.MathUtils.damp(birdRoot.scale.x,baseScale,5,dt);birdRoot.scale.setScalar(scale);
   }
   renderer.render(scene,camera);raf=requestAnimationFrame(animate);
  };
  raf=requestAnimationFrame(animate);
  return()=>{cancelAnimationFrame(raf);removeEventListener('pointermove',move);removeEventListener('resize',resize);document.body.classList.remove('phoenixCursorActive');mixer?.stopAllAction();scene.traverse(object=>{if(object instanceof THREE.Mesh){object.geometry?.dispose();const materials=Array.isArray(object.material)?object.material:[object.material];materials.forEach(material=>material.dispose())}});renderer.dispose();renderer.domElement.remove()};
 },[]);
 return <div ref={host} className="flyingPhoenix front" aria-hidden="true"><span className="phoenixCursorTip"/></div>;
}
