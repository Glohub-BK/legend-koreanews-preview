
// Browser review harness only; never imported by the HyperFrames render compositions.
const root=document.querySelector('#root'), video=document.querySelector('video');
function fit(){const s=Math.min(innerWidth/Number(root.dataset.width),innerHeight/Number(root.dataset.height));root.style.transform=`scale(${s})`;root.style.left=((innerWidth-Number(root.dataset.width)*s)/2)+'px';root.style.top=((innerHeight-Number(root.dataset.height)*s)/2)+'px'}
addEventListener('resize',fit);fit();
function draw(){if(video&&!video.paused){frameTimeline.seek(video.currentTime,false);requestAnimationFrame(draw)}}if(video){video.addEventListener("play",draw);video.addEventListener("seeked",()=>frameTimeline.seek(video.currentTime,false));}else{frameTimeline.seek(3,false);}
window.review={async play(from=0){if(video){video.currentTime=from;await video.play()}},pause(){video?.pause()},seek(t){if(video){video.pause();video.currentTime=t}frameTimeline.seek(t,false)},state(){return {time:video?.currentTime,paused:video?.paused,muted:video?.muted,duration:video?.duration,readyState:video?.readyState}}};
addEventListener('message',async e=>{if(e.data?.action==='play') {try{await review.play(e.data.from||0);parent.postMessage({type:'play-result',ok:true},location.origin)}catch(error){parent.postMessage({type:'play-result',ok:false,message:error.message},location.origin)}}if(e.data?.action==='pause')review.pause();if(e.data?.action==='seek')review.seek(e.data.time)});
