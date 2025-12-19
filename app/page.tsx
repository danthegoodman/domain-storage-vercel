"use client";
import {useEffect} from "react";

export default function Home() {
  useEffect(() => {
    doLoad()

    window.addEventListener('message', ({origin, data}) => {
      if (origin === window.location.origin) return;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'set') {
        window.localStorage.setItem('store', data.content)
      } else if (data.type === 'load') {
        doLoad()
      }
    })
  }, []);
  return (<div/>);
}

function doLoad() {
  const content = window.localStorage.getItem('store');
  window.parent.postMessage({type: 'load', content}, document.referrer);
}
