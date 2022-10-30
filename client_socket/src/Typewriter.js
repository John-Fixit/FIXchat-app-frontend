import React from 'react'
import TypewriterEffect from 'typewriter-effect'
function Typewriter() {
    const words = 'HELLO WORLD'
  return (
    <div>
        <TypewriterEffect 
    options={{
        strings: words,
        autoStart: true,
        loop: true
    }}
    

/>

    </div>
  )
}

export default Typewriter